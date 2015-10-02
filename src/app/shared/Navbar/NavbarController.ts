/// <reference path="../../tsd.d.ts" />

import {AuthenticationService} from "../../shared/authentication/AuthenticationModule";
import RouteConstants = require("../../config/Routing/RouteConstants");
import {TransactionFiltersRouteHelperService} from "../../shared/TransactionFilters/TransactionFiltersModule";

// ReSharper disable once WrongExpressionStatement
"use strict";

class NavbarController {
    public static controllerName = "NavbarController";
    public static controllerAsName = "navbarCtrl";

    public isCollapsed = true;

    public languages: { [id: string] : string; } = {
        "English": "en",
        "French": "fr",
        "German": "de",
        "Spanish": "es"
    };

    public static $inject = [
        "$log",
        "$scope",
        "$translate",
        "$state",
        AuthenticationService.serviceName,
        TransactionFiltersRouteHelperService.serviceName
    ];

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                private $translate: ng.translate.ITranslateService,
                private $state: ng.ui.IStateService,
                public authenticationService: AuthenticationService,
                public routingHelperService: TransactionFiltersRouteHelperService) {

        this.$log = this.$log.getInstance("Shared.Navbar.NavbarController");

        this.$log.debug("Constructed", this);
    }

    public setLanguage(key: string) {
        this.$log.info("Set Language: %s", key);
        this.$translate.use(key);
    }

    public goHome() {
        this.authenticationService.isLoggedIn ? this.$state.go(RouteConstants.privateHomeStateName) : this.$state.go(RouteConstants.homeStateName);
    }
}

export = NavbarController;
