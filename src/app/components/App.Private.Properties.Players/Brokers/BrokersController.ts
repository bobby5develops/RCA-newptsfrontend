/// <reference path="../../../tsd.d.ts" />

import * as _ from "lodash";
import * as NodeUtils from "cd-node-utils";

import IBroker = require("./IBroker");

import * as RouteConstants from "../../../config/Routing/RouteConstants";

import {TransactionFiltersService, TransactionFiltersRouteHelperService} from "../../../shared/TransactionFilters/TransactionFiltersModule";
import {PlayersSearchService} from "../../../shared/PlayersSearch/PlayersSearchModule";
import UserPreferencesService = require("../../../shared/UserPreferences/UserPreferencesService");

class BrokersController {
    public static controllerName = "BrokersController";
    public static controllerAs = "brokerCtrl";

    private Brokers: IBroker[] = [];
    private SortField: string = "TotalPropertiesCount";
    private ReverseSortFlag: boolean = true;
    public CurrencySymbol: string = null;
    private static role: string = "brokers";

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

        this.$log = this.$log.getInstance("Components.App.Private.Properties.Players.Brokers.BrokersController");

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
        this.userPreferencesService.userPreferences.then((userPreferences: NodeUtils.UserPreferences.IUserPreferences)=> {
            this.CurrencySymbol = userPreferences.currency.symbol;
        });

        this.transactionFiltersService.getPlayerSearchServiceRequest(BrokersController.role).then(
            (playersSearchServiceRequest: NodeUtils.PropertySearch.Requests.PlayersRequest)=> {
                this.playersSearchService.SearchPlayers(playersSearchServiceRequest).then((data: NodeUtils.PropertySearch.Responses.IPlayersResponse) => {
                    this.Brokers = [];
                    if (_.has(data, "aggregations.Company.cmp.buckets")) {
                        var results = <any[]>_.get(data, "aggregations.Company.cmp.buckets");
                        this.Brokers = _.map(results, (result)=>this.buildBroker(result))
                    } else {
                        this.$log.error("Error parsing Broker response")
                    }

                });
            },
            () => {
                this.$log.error("Error getting Broker response")
            });
    }

    private buildBroker(result: any): IBroker {
        var key = JSON.parse(result.key);
        var dealRoles = <any[]>_.get(result, "dealRole.buckets");

        var broker: IBroker = {
            CompanyId: key.company_id,
            CompanyName: key.company_tx,
            AcquisitionsVolume: 0,
            DispositionsVolume: 0,
            AcquisitionsPropertiesCount: 0,
            DispositionsPropertiesCount: 0,
            TotalVolume: 0,
            TotalPropertiesCount: 0
        };
        _.forEach(dealRoles, (role) => {
            if (role.key === "sb") {
                broker.DispositionsVolume = role.aggregations.TotalVolume_amt.value;
                broker.DispositionsPropertiesCount = role.aggregations.TotalNumberOfProperties_nb.value;
            } else if (role.key === "bb") {
                broker.AcquisitionsVolume = role.aggregations.TotalVolume_amt.value;
                broker.AcquisitionsPropertiesCount = role.aggregations.TotalNumberOfProperties_nb.value;
            }
        });
        broker.TotalVolume = broker.AcquisitionsVolume + broker.DispositionsVolume;
        broker.TotalPropertiesCount = broker.AcquisitionsPropertiesCount + broker.DispositionsPropertiesCount;

        return broker;
    }

    public orderBy(field: string) {
        this.ReverseSortFlag = (this.SortField === field) ? !this.ReverseSortFlag : false;
        this.SortField = field;
    }
}

export = BrokersController;