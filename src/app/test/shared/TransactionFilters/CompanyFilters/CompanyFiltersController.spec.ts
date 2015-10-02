/// <reference path="../../../../tsd.d.ts" />

import angular = require("angular");
import mock = require("angular-mocks-shim");
import angularCookies = require("angular-cookies");
import angularLogger = require("angular-logger-shim");
import lodash = require("lodash");
import uiRouter = require("angular-ui-router");

import {UserPreferences, Constants } from "cd-node-utils";
import {Constants as GeoShapeSearchConstants, GeoShapeSearchService} from "../../../../shared/GeoShapeSearch/GeoShapeSearchModule";
import {moduleName as AuthenticationModuleName, AuthenticationService} from "../../../../shared/Authentication/AuthenticationModule"
import {moduleName as EnvironmentModuleName, EnvironmentConfiguration} from "../../../../shared/Environment/EnvironmentModule";
import {Constants as TransactionFiltersConstants,
    Templates as TransactionFiltersTemplates,
    CompanyFiltersController,
    TransactionFiltersService} from "../../../../shared/TransactionFilters/TransactionFiltersModule";

'use strict';

describe('Controller: CompanyFiltersController', () => {
    var log: ng.ILogService;
    var environment: EnvironmentConfiguration;
    var transactionFiltersService: TransactionFiltersService;
    var companyFiltersController: CompanyFiltersController;
    var authenticationService: AuthenticationService;


    var cookieStore: ng.cookies.ICookiesService;
    var cookieStoreShouldReturnCookie: boolean = true;

    // load the service's module
    beforeEach(mock.module(EnvironmentModuleName));
    beforeEach(mock.module(AuthenticationModuleName));
    beforeEach(mock.module(angularLogger));
    beforeEach(mock.module(angularCookies));
    beforeEach(mock.module(uiRouter));
    beforeEach(mock.module(GeoShapeSearchConstants.ModuleName));
    beforeEach(mock.module(TransactionFiltersTemplates));
    beforeEach(mock.module(TransactionFiltersConstants.ModuleName));

    // instantiate service
    beforeEach(inject(function (_$log_: ng.ILogService,
                                _EnvironmentConfiguration_: EnvironmentConfiguration,
                                $cookieStore: ng.cookies.ICookiesService,
                                _TransactionFiltersService_: TransactionFiltersService,
                                _AuthenticationService_: AuthenticationService) {
        log = _$log_;
        environment = _EnvironmentConfiguration_;
        cookieStore = $cookieStore;
        transactionFiltersService = _TransactionFiltersService_;
        authenticationService = _AuthenticationService_;

        spyOn(cookieStore, "put").and.callFake(()=> {
        });
        spyOn(cookieStore, "remove").and.callFake(()=> {
        });
        spyOn(cookieStore, "get").and.callFake((key: string)=>
            cookieStoreShouldReturnCookie && key === AuthenticationService.authenticationCookieName
                ? user_jwt
                : null);
    }));

    afterEach(function () {
    });
    it('Should have a programmer write some unit tests', () => {
    });
});

var user_jwt = "%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50VXNlcl9pZCI6NzgyNDEsImZpcnN0TmFtZV90eCI6IlN0YW5sZXkiLCJsYXN0TmFtZV90eCI6IkdvbGRtYW4iLCJhY2NvdW50QWRtaW5fZmciOnRydWUsInN5c3RlbUFkbWluX2ZnIjpmYWxzZSwiaWF0IjoxNDQyNjA4OTU1LCJleHAiOjE0NDI2OTUzNTV9.MHUln9RsS_qCfGsdWl-Yu2tpkyEwYr8XTqr2QKdKWLs%22";
