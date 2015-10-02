/// <reference path="../../tsd.d.ts" />

import {TransactionFiltersService, TransactionFiltersRouteHelperService} from "../../shared/TransactionFilters/TransactionFiltersModule";

"use strict";

class PlayersController {
    public static controllerName: string = "PlayersController";
    public static controllerAsName: string = "playersCtrl";

    public static $inject: string[] = [
        "$log",
        "$state",
        TransactionFiltersService.serviceName,
        TransactionFiltersRouteHelperService.serviceName
    ];

    constructor(private $log: ng.ILogService,
                private $state: ng.ui.IStateService,
                private transactionFiltersService: TransactionFiltersService,
                public routingHelperService: TransactionFiltersRouteHelperService) {

        this.$log = this.$log.getInstance("Components.App.Private.Properties.Players.PlayersController");

        this.$log.debug("Constructed", this);
    }

    public get mapBounds(): AngularGoogleMaps.IBounds {
        return this.transactionFiltersService.mapBounds;
    };

    public get mapCenter(): AngularGoogleMaps.IPoint {
        return this.transactionFiltersService.MapCenter;
    };

    public get mapZoom(): number {
        return this.transactionFiltersService.MapZoom;
    };

    public get isBrokersSelected(): boolean {
        return this.$state.includes("app.private.properties.players.brokers");
    }

    public set isBrokersSelected(value: boolean) {
        this.routingHelperService.goBrokers();
    }

    public get isBuyersSelected(): boolean {
        return this.$state.includes("app.private.properties.players.buyers");
    }

    public set isBuyersSelected(value: boolean) {
        this.routingHelperService.goBuyers();
    }

    public get isSellersSelected(): boolean {
        return this.$state.includes("app.private.properties.players.sellers");
    }

    public set isSellersSelected(value: boolean) {
        this.routingHelperService.goSellers();
    }
}

export = PlayersController;