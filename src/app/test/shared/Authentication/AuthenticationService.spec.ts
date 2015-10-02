/// <reference path="../../../tsd.d.ts" />

import angular = require("angular");
import mock = require("angular-mocks-shim");
import angularLogger = require("angular-logger-shim");
import angularCookies = require("angular-cookies");
import lodash = require("lodash");

import {PropertySearch} from "cd-node-utils";
import {moduleName as AuthModuleName, AuthenticationService, User, IAuthenticationResponse} from "../../../shared/Authentication/AuthenticationModule"
import {moduleName as EnvironmentModuleName, EnvironmentConfiguration} from "../../../shared/Environment/EnvironmentModule";
import AuthInterceptorService = require("../../../config/Authentication/AuthInterceptorService");

'use strict';

describe('Service: AuthenticationService', () => {
    var log: ng.ILogService;
    var httpBackend: ng.IHttpBackendService;
    var rootScope: ng.IRootScopeService;
    var environment: EnvironmentConfiguration;
    var authenticationService: AuthenticationService;

    var cookieStore: ng.cookies.ICookiesService;
    var cookieStoreShouldReturnCookie: boolean = true;

    // load the service's module
    beforeEach(mock.module(EnvironmentModuleName));
    beforeEach(mock.module(AuthModuleName));
    beforeEach(mock.module(angularLogger));
    beforeEach(mock.module(angularCookies));

    beforeEach(inject(function (_$log_: ng.ILogService,
                                $httpBackend: ng.IHttpBackendService,
                                $rootScope: ng.IRootScopeService,
                                $cookieStore: ng.cookies.ICookiesService,
                                _EnvironmentConfiguration_: EnvironmentConfiguration) {
        log = _$log_;
        httpBackend = $httpBackend;
        rootScope = $rootScope;
        cookieStore = $cookieStore;
        environment = _EnvironmentConfiguration_;

        spyOn(rootScope, "$emit");
        
        spyOn(cookieStore, "put").and.callFake(()=>{});
        spyOn(cookieStore, "remove").and.callFake(()=>{});
        spyOn(cookieStore, "get").and.callFake((key:string)=>
            cookieStoreShouldReturnCookie && key === AuthenticationService.authenticationCookieName
            ? user_jwt
            : null);

        httpBackend
            .whenPOST(AuthenticationService.loginServiceUrl(environment.ServerAPIv2Url), (data)=>angular.equals(data, angular.toJson(login_success_credentials)))
            .respond(200, login_success_response);

        httpBackend
            .whenPOST(AuthenticationService.loginServiceUrl(environment.ServerAPIv2Url), (data)=>!angular.equals(data, angular.toJson(login_success_credentials)))
            .respond(401, login_failure_response);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('With Authenticated Cookie Set', () => {
        beforeEach(() => {
            cookieStoreShouldReturnCookie = true;
        });

        beforeEach(inject(function (_AuthenticationService_: AuthenticationService) {
            authenticationService = _AuthenticationService_;
        }));

        it('Should get jwt during constructor', () => {
            expect(authenticationService.jwt).toBe(user_jwt);
            expect(authenticationService.user).toEqual(jasmine.objectContaining(user_object));
            expect(rootScope.$emit)
                .toHaveBeenCalledWith(AuthenticationService.loginEvent, jasmine.objectContaining(user_object));
        });

        it("Should not be able to login again", ()=> {
            expect(authenticationService.isLoggedIn).toBe(true);
            expect(()=>authenticationService.login(login_success_credentials.email, login_success_credentials.password))
                .toThrow(AuthenticationService.userAlreadyLoggedInError);
        });
    });

    describe('With No Authenticated Cookie Set', () => {
        beforeEach(() => {
            cookieStoreShouldReturnCookie = false;
        });

        beforeEach(inject(function (_AuthenticationService_: AuthenticationService) {
            authenticationService = _AuthenticationService_;
        }));

        it('Should not get jwt', () => {
            expect(authenticationService.jwt).toBeNull();
            expect(authenticationService.user).toBeNull();
            expect(rootScope.$emit).not.toHaveBeenCalled();
        });

        it("Should not be able to logout again", ()=> {
            expect(authenticationService.isLoggedIn).toBe(false);
            expect(()=>authenticationService.logout()).toThrow(AuthenticationService.userAlreadyLoggedOutError);
        });

        it("Should be able to login", ()=> {
            authenticationService
                .login(login_success_credentials.email, login_success_credentials.password)
                .then(
                (authenticationResponse: IAuthenticationResponse)=> {
                    // You would think you could just do, but it doesn't seem to work
                    // expect(authenticationResponse).toEqual(jasmine.objectContaining(authentication_response_object));
                    // -Stan

                    expect(authenticationResponse.errorMessage).toEqual(authentication_response_object.errorMessage);
                    expect(authenticationResponse.jwt).toEqual(authentication_response_object.jwt);
                    expect(authenticationResponse.user).toEqual(jasmine.objectContaining(authentication_response_object.user));
                }, (error: any)=> {
                    fail(angular.toJson(error));
                });

            httpBackend.flush();
        });
    });
});

var user_jwt = "%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50VXNlcl9pZCI6NzgyNDEsImZpcnN0TmFtZV90eCI6IlN0YW5sZXkiLCJsYXN0TmFtZV90eCI6IkdvbGRtYW4iLCJhY2NvdW50QWRtaW5fZmciOnRydWUsInN5c3RlbUFkbWluX2ZnIjpmYWxzZSwiaWF0IjoxNDQyNjA4OTU1LCJleHAiOjE0NDI2OTUzNTV9.MHUln9RsS_qCfGsdWl-Yu2tpkyEwYr8XTqr2QKdKWLs%22";

var user_object = new User(78241, undefined, "Stanley", "Goldman", undefined, undefined);

var login_success_credentials = {email: "sgoldman@rcanalytics.com", password: "red123"};

var login_success_response = {"token": user_jwt};

var login_failure_response = {"statusCode": 404, "error": "Not Found", "message": "No user found"};

var authentication_response_object = {errorMessage: null, jwt: user_jwt, user: user_object};