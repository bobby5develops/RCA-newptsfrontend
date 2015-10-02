/// <reference path="../../tsd.d.ts" />

import {AuthenticationService, IAuthenticationResponse} from "../../shared/authentication/AuthenticationModule";

import RouteConstants = require("../../config/Routing/RouteConstants");

// ReSharper disable once WrongExpressionStatement
"use strict";

class LoginController {
    public static controllerName = "LoginController";
    public static controllerAsName = "loginCtrl";

    public isAuthenticating: boolean = false;
    public username: string = null;
    public password: string = null;
    public loginErrorMessage: string = null;

    public loginForm: ng.IFormController = null;

    public static $inject = ["$log", "$scope", "$state", AuthenticationService.serviceName];

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                private $state: ng.ui.IStateService,
                private authenticationService: AuthenticationService) {

        this.$log = this.$log.getInstance("components.Login.LoginController");
        this.$log.debug("Constructed", this);
    }

    public login(): void {
        this.$log.info("Login", this.username);

        this.isAuthenticating = true;
        this.loginErrorMessage = null;

        this.authenticationService.login(this.username, this.password)
            .then((response: IAuthenticationResponse) => {
                this.$state.go(RouteConstants.propertiesTransactonsStateName);
            }).catch((response: IAuthenticationResponse) => {
                this.loginErrorMessage = response.errorMessage;
            }).finally(() => {
                this.isAuthenticating = false;
            });
    }
}

export = LoginController;

