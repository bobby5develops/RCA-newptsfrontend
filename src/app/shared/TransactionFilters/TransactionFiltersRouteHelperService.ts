/// <reference path="../../tsd.d.ts" />

import lodash = require("lodash");

import * as RouteConstants from "../../config/Routing/RouteConstants";
import TransactionFiltersService from "./TransactionFiltersService";
import ViewModeEnum from "./ViewModeEnum";

'use strict';

interface ITransactionFiltersRouteParameters{
    lat: number,
    lon: number,
    zoom: number,
    view: string,
    sw?: string,
    ne?: string,
}

class ITransactionFiltersRouteOptions {
    includeBounds: boolean;
    ignoreGeoShape: boolean;
}

class TransactionFiltersRouteOptions implements ITransactionFiltersRouteOptions{
    public includeBounds: boolean;
    public ignoreGeoShape: boolean = false;

    constructor();
    constructor(includeBounds: boolean, ignoreGeoShape: boolean);

    constructor(includeBounds: boolean = true, ignoreGeoShape: boolean = false){
        this.includeBounds = includeBounds;
        this.ignoreGeoShape = ignoreGeoShape;
    }
}

class TransactionFiltersRouteHelperService {

    public static serviceName: string = "TransactionFiltersRouteHelperService";
    public static $inject: string[] = [
        "$log",
        "$state",
        TransactionFiltersService.serviceName
    ];

    constructor(private $log: ng.ILogService,
                private $state: ng.ui.IStateService,
                private transactionFiltersService: TransactionFiltersService) {
        this.$log = this.$log.getInstance("Shared.TransactionFilters.TransactionFiltersRouteHelperService");

        this.$log.debug("Constructed", this);
    }

    public getParams(routeParamArguments: ITransactionFiltersRouteOptions = new TransactionFiltersRouteOptions()): any {
        if (routeParamArguments.ignoreGeoShape || this.transactionFiltersService.searchGeoShape === null) {
            var result: ITransactionFiltersRouteParameters = {
                lat: this.transactionFiltersService.MapCenter.latitude,
                lon: this.transactionFiltersService.MapCenter.longitude,
                zoom: this.transactionFiltersService.MapZoom,
                view: ViewModeEnum[this.transactionFiltersService.viewMode].toLowerCase(),
            };

            if (routeParamArguments.includeBounds) {
                var southwest = this.transactionFiltersService.mapBounds.southwest;
                var northeast = this.transactionFiltersService.mapBounds.northeast;
                result.sw = `${southwest.longitude},${southwest.latitude}`;
                result.ne = `${northeast.longitude},${northeast.latitude}`;
            }

            return result;
        }

        return null;
    }

    public parseParams($stateParams: ng.ui.IStateParamsService) {
        const ne: string = $stateParams["ne"];
        const sw: string = $stateParams["sw"];
        const lat: string = $stateParams["lat"];
        const view: string = $stateParams["view"];
        const lon: string = $stateParams["lon"];
        const zoom: string = $stateParams["zoom"];

        if (lat && lon && zoom && view) {
            this.transactionFiltersService.MapCenter.longitude = parseFloat(lon);
            this.transactionFiltersService.MapCenter.latitude = parseFloat(lat);
            this.transactionFiltersService.MapZoom = parseInt(zoom);

            const viewModeIntValue: number= lodash(ViewModeEnum).pairs()
                .filter((value: any[]) => value[0].toLowerCase() === view)
                .map((value: any[]) => value[1])
               .first();

            this.transactionFiltersService.viewMode = ViewModeEnum[ViewModeEnum[viewModeIntValue]];
        }

        var mapBounds = null;
        if (ne && sw) {
            const nePoints = ne.split(",");
            const swPoints = sw.split(",");

            mapBounds = {
                northeast: {latitude: parseFloat(nePoints[1]), longitude: parseFloat(nePoints[0])},
                southwest: {latitude: parseFloat(swPoints[1]), longitude: parseFloat(swPoints[0])}
            };
        } else {
            mapBounds = {
                northeast: {latitude: null, longitude: null},
                southwest: {latitude: null, longitude: null}
            };
        }

        this.transactionFiltersService.mapBounds = mapBounds;
    }

    public goBuyers(): void {
        this.$state.go(RouteConstants.propertiesPlayersBuyersStateName, this.getParams());
    }

    public goSellers(): void {
        this.$state.go(RouteConstants.propertiesPlayersSellersStateName, this.getParams());
    }

    public goBrokers(): void {
        this.$state.go(RouteConstants.propertiesPlayersBrokersStateName, this.getParams());
    }

    public goTransactions(): void {
        const routeParamArguments = new TransactionFiltersRouteOptions();
        routeParamArguments.ignoreGeoShape = true;

        this.$state.go(RouteConstants.propertiesTransactonsStateName, this.getParams(routeParamArguments));
    }
}

export {TransactionFiltersRouteHelperService as default, ITransactionFiltersRouteParameters, TransactionFiltersRouteOptions, ITransactionFiltersRouteOptions};
