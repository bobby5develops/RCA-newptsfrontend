/// <reference path="../../../tsd.d.ts" />

import * as _ from "lodash";
import * as NodeUtils from "cd-node-utils";

import Seller = require("./Seller");
import SellerData = require("./SellerData");

import * as RouteConstants from "../../../config/Routing/RouteConstants";

import {TransactionFiltersService, TransactionFiltersRouteHelperService} from "../../../shared/TransactionFilters/TransactionFiltersModule";
import {PlayersSearchService} from "../../../shared/PlayersSearch/PlayersSearchModule";
import UserPreferencesService = require("../../../shared/UserPreferences/UserPreferencesService");

class SellersController {
    public static controllerName = "SellersController";
    public static controllerAs = "sellerCtrl";

    private sellers: Seller[] = [];
    private sortField: string = "totalNumberOfProperties";
    private reverseSortFlag: boolean = true;
    public currencySymbol: string = null;
    private static role: string = "sellers";

    public static $inject = ["$log",
        "$scope",
        "$state",
        "$stateParams",
        TransactionFiltersService.serviceName,
        PlayersSearchService.ServiceName,
        UserPreferencesService.serviceName,
        TransactionFiltersRouteHelperService.serviceName];

    constructor(private $log: ng.ILogService, private $scope: ng.IScope,
                private $state: ng.ui.IStateService,
                private $stateParams: ng.ui.IStateParamsService,
                private transactionFiltersService: TransactionFiltersService,
                private playersSearchService: PlayersSearchService,
                private userPreferencesService: UserPreferencesService,
                private routingHelperService: TransactionFiltersRouteHelperService) {

        this.$log = this.$log.getInstance("Components.App.Private.Properties.Players.Brokers.SellersController");

        const ne = this.$stateParams["ne"];
        const sw = this.$stateParams["sw"];
        const lat = this.$stateParams["lat"];
        const lon = this.$stateParams["lon"];
        const zoom = this.$stateParams["zoom"];

        this.routingHelperService.parseParams(this.$stateParams);

        if(!(transactionFiltersService.searchGeoShape || (
            transactionFiltersService.mapBounds.northeast.latitude &&
            transactionFiltersService.mapBounds.northeast.longitude &&
            transactionFiltersService.mapBounds.southwest.latitude &&
            transactionFiltersService.mapBounds.southwest.longitude)))
        {
            this.$log.warn("Missing map bounds and search shape redirecting to Transactions");
            this.$state.go(RouteConstants.propertiesTransactonsStateName);

        }
        else {
            this.loadData();

            this.$scope.$on(UserPreferencesService.userPreferencesChangedEvent, (angularEvent: ng.IAngularEvent, userPreferences: NodeUtils.UserPreferences.IUserPreferences)=> {
                this.loadData();
            });
        }

        this.$log.debug("Constructed", this);
    }

    private loadData(): void {
        this.userPreferencesService.userPreferences.then((userPreferences:NodeUtils.UserPreferences.IUserPreferences)=>{
            this.currencySymbol = userPreferences.currency.symbol;
        });

        this.transactionFiltersService.getPlayerSearchServiceRequest(SellersController.role).then(
            (playersSearchServiceRequest: NodeUtils.PropertySearch.Requests.PlayersRequest)=>{
                this.playersSearchService.SearchPlayers(playersSearchServiceRequest).then((data: NodeUtils.PropertySearch.Responses.IPlayersResponse) => {
                    this.sellers = [];
                    if (_.has(data, "aggregations.Company.cmp.buckets")) {
                        var results = <any[]>_.get(data, "aggregations.Company.cmp.buckets");
                        this.sellers = _.map(results, (result)=> this.buildSeller(result));
                    } else {
                        this.$log.error("Error parsing Sellers response")
                    }

                });
            },
            ()=> {
                this.$log.error("Error getting Sellers response")
            });
    }

    private buildSeller(result: any): Seller {
        var key = JSON.parse(result.key);

        var nullIfTheStringNullOrEmpty = (item: string)=>item === 'null' ? null : (item.trim() === '' ? null : item);

        let city = nullIfTheStringNullOrEmpty(key.city_tx);
        let stateProvince = nullIfTheStringNullOrEmpty(key.stateProvince_tx);
        let country = nullIfTheStringNullOrEmpty(key.country_tx);

        var seller = new Seller(key.company_id, key.company_tx,
            city, stateProvince, country,
            key.investorGroup_tx);

        _.forEach(result.aggregations.PropertyType.buckets, (propTypeResult: any)=> {
            let numberOfProperties = propTypeResult.TotalNumberOfProperties_nb.value;
            let numberOfUnits = propTypeResult.TotalUnits_nb.value;
            let totalVolume = propTypeResult.TotalVolume_amt.value;
            let buyerData = new SellerData(numberOfProperties, numberOfUnits, totalVolume);

            switch (propTypeResult.key) {
                case "Apartment":
                    seller.apartment = buyerData;
                    break;

                case "Dev Site":
                    seller.devSite = buyerData;
                    break;

                case "Hotel":
                    seller.hotel = buyerData;
                    break;

                case "Industrial":
                    seller.industrial = buyerData;
                    break;

                case "Office":
                    seller.office = buyerData;
                    break;

                case "Retail":
                    seller.retail = buyerData;
                    break;

                case "Seniors Housing & Care":
                    seller.seniors = buyerData;
                    break;

                case "Other":
                    seller.other = buyerData;
                    break;

                default:
                    throw `Unkown Property Type: ${propTypeResult.key}`;
            }
        });

        return seller;
    }

    public orderBy(field: string) {
        this.reverseSortFlag = (this.sortField === field) ? !this.reverseSortFlag : false;
        this.sortField = field;
    }
}

export = SellersController;