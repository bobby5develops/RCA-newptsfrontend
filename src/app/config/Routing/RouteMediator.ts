/// <reference path="../../tsd.d.ts" />

import RouteConstants = require("./RouteConstants");

import {AuthenticationService} from "../../shared/authentication/AuthenticationModule";

class RouteMediator {
    public static $inject = ["$log", "$rootScope", "$state", AuthenticationService.serviceName];

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $state: ng.ui.IStateService,
                private authenticationService: AuthenticationService) {
        this.$log = this.$log.getInstance("Config.Routing.RouteMediator");

        this.$rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {

            this.$log.info("StateChange", toState);

            if (toState.data && toState.data.authRequired && !this.authenticationService.isLoggedIn) {
                event.preventDefault();
                this.$log.debug("Authenticated page; Redirecting to login");
                this.$state.go(RouteConstants.loginStateName, null, null);
            }

            if (toState.name === RouteConstants.loginStateName && this.authenticationService.isLoggedIn) {
                event.preventDefault();
                this.$state.go(RouteConstants.homeStateName, null, null);
            }
        });

        this.$log.debug("Constructed");
    }
}

export = RouteMediator;
