/// <reference path="../../../tsd.d.ts" />

import * as _ from "lodash";
import * as NodeUtils from "cd-node-utils";

import Buyer = require("./Buyer");
import BuyerData = require("./BuyerData");

import * as RouteConstants from "../../../config/Routing/RouteConstants";

import {TransactionFiltersService, TransactionFiltersRouteHelperService} from "../../../shared/TransactionFilters/TransactionFiltersModule";
import {PlayersSearchService} from "../../../shared/PlayersSearch/PlayersSearchModule";
import UserPreferencesService = require("../../../shared/UserPreferences/UserPreferencesService");

class BuyersController {
    public static controllerName = "BuyersController";
    public static controllerAs = "buyerCtrl";

    private buyers: Buyer[] = [];
    private sortField: string = "totalNumberOfProperties";
    private reverseSortFlag: boolean = true;
    public currencySymbol: string = null;
    private static role: string = "buyers";

    public static $inject = ["$log",
        "$scope",
        "$q",
        "$state",
        "$stateParams",
        TransactionFiltersService.serviceName,
        PlayersSearchService.ServiceName,
        UserPreferencesService.serviceName,
        TransactionFiltersRouteHelperService.serviceName];

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                private $q: ng.IQService,
                private $state: ng.ui.IStateService,
                private $stateParams: ng.ui.IStateParamsService,
                private transactionFiltersService: TransactionFiltersService,
                private playersSearchService: PlayersSearchService,
                private userPreferencesService: UserPreferencesService,
                private routingHelperService: TransactionFiltersRouteHelperService) {

        this.$log = this.$log.getInstance("Components.App.Private.Properties.Players.Brokers.BuyersController");

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

    private loadData() {
        this.$q.all([
            this.userPreferencesService.userPreferences,
            this.transactionFiltersService.getPlayerSearchServiceRequest(BuyersController.role)
        ]).then(
            (promiseResults: any[])=> {
                var userPreferences: NodeUtils.UserPreferences.IUserPreferences = promiseResults[0];
                this.currencySymbol = userPreferences.currency.symbol;

                var playersSearchServiceRequest: NodeUtils.PropertySearch.Requests.PlayersRequest = promiseResults[1];

                this.playersSearchService.SearchPlayers(playersSearchServiceRequest)
                    .then(
                    (data: NodeUtils.PropertySearch.Responses.IPlayersResponse)=> {
                        this.buyers = [];

                        if (_.has(data, "aggregations.Company.cmp.buckets")) {
                            var results = <any[]>_.get(data, "aggregations.Company.cmp.buckets");
                            this.buyers = _.map(results, (result)=> this.buildBuyer(result));
                        } else {
                            this.$log.error("Error parsing Buyer response")
                        }

                    },
                    ()=> {
                        this.$log.error("Error getting Buyer response")
                    });

            }, ()=> {
                this.$log.error("Error loading Buyer data");
            });
    }

    private buildBuyer(result: any): Buyer {
        var key = JSON.parse(result.key);

        var nullIfTheStringNullOrEmpty = (item: string)=>item === 'null' ? null : (item.trim() === '' ? null : item);

        let city = nullIfTheStringNullOrEmpty(key.city_tx);
        let stateProvince = nullIfTheStringNullOrEmpty(key.stateProvince_tx);
        let country = nullIfTheStringNullOrEmpty(key.country_tx);

        var buyer = new Buyer(key.company_id, key.company_tx,
            city, stateProvince, country,
            key.investorGroup_tx);

        _.forEach(result.aggregations.PropertyType.buckets, (propTypeResult: any)=> {
            let numberOfProperties = propTypeResult.TotalNumberOfProperties_nb.value;
            let numberOfUnits = propTypeResult.TotalUnits_nb.value;
            let totalVolume = propTypeResult.TotalVolume_amt.value;
            let buyerData = new BuyerData(numberOfProperties, numberOfUnits, totalVolume);

            switch (propTypeResult.key) {
                case "Apartment":
                    buyer.apartment = buyerData;
                    break;

                case "Dev Site":
                    buyer.devSite = buyerData;
                    break;

                case "Hotel":
                    buyer.hotel = buyerData;
                    break;

                case "Industrial":
                    buyer.industrial = buyerData;
                    break;

                case "Office":
                    buyer.office = buyerData;
                    break;

                case "Retail":
                    buyer.retail = buyerData;
                    break;

                case "Seniors Housing & Care":
                    buyer.seniors = buyerData;
                    break;

                case "Other":
                    buyer.other = buyerData;
                    break;

                default:
                    throw `Unkown Property Type: ${propTypeResult.key}`;
            }
        });

        return buyer;
    }

    public orderBy(field: string) {
        this.reverseSortFlag = (this.sortField === field) ? !this.reverseSortFlag : false;
        this.sortField = field;
    }
}

export = BuyersController;
