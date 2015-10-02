/// <reference path="../../../tsd.d.ts" />

import angular = require("angular");
import mock = require("angular-mocks-shim");
import angularCookies = require("angular-cookies");
import angularLogger = require("angular-logger-shim");
import lodash = require("lodash");

import {UserPreferences, Constants } from "cd-node-utils";
import {moduleName as EnvironmentModuleName, EnvironmentConfiguration} from "../../../shared/Environment/EnvironmentModule";
import {moduleName as AuthenticationModuleName, AuthenticationService} from "../../../shared/Authentication/AuthenticationModule"
import {moduleName as UserPreferencesModule, UserPreferencesService, PersonalInformation} from "../../../shared/UserPreferences/UserPreferencesModule";


'use strict';

describe('Service: UserPreferencesService', () => {
    var log: ng.ILogService;
    var httpBackend: ng.IHttpBackendService;
    var environment: EnvironmentConfiguration;
    var userPreferencesService: UserPreferencesService;
    var authenticationService: AuthenticationService;


    // load the service's module
    beforeEach(mock.module(EnvironmentModuleName));
    beforeEach(mock.module(AuthenticationModuleName));
    beforeEach(mock.module(UserPreferencesModule));
    beforeEach(mock.module(angularLogger));
    beforeEach(mock.module(angularCookies));

    // instantiate service
    beforeEach(inject(function (_$log_: ng.ILogService,
                                $httpBackend: ng.IHttpBackendService,
                                _EnvironmentConfiguration_: EnvironmentConfiguration,
                                _AuthenticationService_: AuthenticationService,
                                _UserPreferencesService_: UserPreferencesService) {
        log = _$log_;
        httpBackend = $httpBackend;
        environment = _EnvironmentConfiguration_;
        authenticationService = _AuthenticationService_;
        spyOn(authenticationService, "getUserFromJwt").and.returnValue({AccountUserId: 1000});
        userPreferencesService = _UserPreferencesService_;
        httpBackend.whenGET(userPreferencesService.PersonalUrl).respond(personal);
        httpBackend.whenGET(userPreferencesService.SettingsUrl).respond(setting);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Should have expected URLs', () => {
        expect(userPreferencesService.ChangePasswordUrl).toBe("https://pts.rcanalytics.local/api/v1/accountUser/1000/changePassword");
        expect(userPreferencesService.PersonalUrl).toBe("https://pts.rcanalytics.local/api/v1/accountUser/1000/personal");
        expect(userPreferencesService.SettingsUrl).toBe("https://pts.rcanalytics.local/api/v1/accountUser/1000/settings");
    });

    /* TODO fix test when authenticationService.user works.
    it('Should execute a valid Request and Response for Settings', () => {
        var prefs = userPreferencesService.userPreferences.then((settings: UserPreferences.IUserPreferences) => {
            var userSettings: UserPreferences.IUserPreferences = settings;
            var currency = userSettings.currency;
            var measurementUnit = userSettings.measurementUnit;
            expect(currency).toEqual(Constants.Currency.Dictionary.USD);
            expect(measurementUnit).toEqual(Constants.Measurements.Dictionary.SquareFeet);
        }, (error) => {
            fail(error);
        });
    });
    */

    it('Should execute a valid Request and Response for Personal', () => {
        userPreferencesService.PersonalInformation.then((personalInformation: PersonalInformation) => {
            var personalInfo = new PersonalInformation(
                personal.email_tx,
                personal.firstName_tx,
                personal.lastName_tx,
                personal.address_tx,
                personal.country_tx,
                personal.stateProvince_tx,
                personal.city_tx);
            expect(personalInformation).toEqual(personalInfo);
        }, (error) => {
            fail(error);
        });
        httpBackend.flush();
    });
});

var setting = {"accountUser_id": 79803, "prefCurrency_id": 1, "prefPropertyMeasure_id": 1};

var personal = {
    "accountUser_id": 79803,
    "email_tx": "usgreg@week.com",
    "firstName_tx": "US",
    "lastName_tx": "Greg",
    "address_tx": "100 Main Street",
    "country_tx": "United States",
    "stateProvince_tx": "New York",
    "city_tx": "Albany"
};

