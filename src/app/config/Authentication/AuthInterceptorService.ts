/// <reference path="../../tsd.d.ts" />

import IHttpInterceptor = require("./IHttpInterceptor");
import RouteConstants = require("../Routing/RouteConstants");

import AuthenticationModule = require("../../shared/authentication/AuthenticationModule");
import AuthenticationService = AuthenticationModule.AuthenticationService;

// ReSharper disable once WrongExpressionStatement
"use strict";

class AuthInterceptorService implements IHttpInterceptor {
    public static serviceName = "AuthInterceptorService";
    public static $inject = ["$rootScope", "$injector", "$q"];

    constructor(private $rootScope: ng.IRootScopeService,
        private $injector: ng.auto.IInjectorService,
        private $q: ng.IQService) {
    }

    // ReSharper disable once InconsistentNaming
    private _authenticationService: AuthenticationService = null;
    private get authenticationService(): AuthenticationService {
        if (this._authenticationService == null) {
            this._authenticationService = this.$injector.get<AuthenticationService>(AuthenticationService.serviceName);
        }

        return this._authenticationService;
    }

    // ReSharper disable once InconsistentNaming
    private _stateService: ng.ui.IStateService = null;
    private get stateService(): ng.ui.IStateService {
        if (this._stateService == null) {
            this._stateService = this.$injector.get<ng.ui.IStateService>("$state");
        }

        return this._stateService;
    }

    // ReSharper disable once InconsistentNaming
    private _logService: ng.ILogService = null;
    private get logService(): ng.ILogService {
        if (this._logService == null) {
            this._logService = this.$injector.get<ng.ILogService>("$log");
            this._logService = this._logService.getInstance("components.config.Authentication.AuthInterceptorService");
        }

        return this._logService;
    }

    public request = (config: ng.IRequestConfig): ng.IRequestConfig => {
        config.headers = config.headers || {};
        var jwt = this.authenticationService.jwt;
        if (jwt != null) {
            config.headers.Authorization = "Bearer " + jwt;
        }
        return config;
    };

    public responseError = (response: ng.IHttpPromiseCallbackArg<any>): ng.IPromise<any> => {
        if (response.status === 401) {
            this.logService.error("401 Intercepted");

            this.authenticationService.logout();
            this.stateService.go(RouteConstants.loginStateName);
        }

        return this.$q.reject(response);
    };
}

export = AuthInterceptorService;

