/// <reference path="../../../tsd.d.ts" />

import angular = require("angular");
import mock = require("angular-mocks-shim");
import angularLogger = require("angular-logger-shim");
import angularCookies = require("angular-cookies");
import lodash = require("lodash");

import {PropertySearch} from "cd-node-utils";
import {moduleName as AuthModuleName, AuthenticationService} from "../../../shared/Authentication/AuthenticationModule"
import {moduleName as GeoPermissionsModuleName, GeoPermissionsService} from "../../../shared/GeoPermissions/GeoPermissionsModule";
import {moduleName as EnvironmentModuleName, EnvironmentConfiguration} from "../../../shared/Environment/EnvironmentModule";


'use strict';

describe('Service: GeoPermissions', () => {
    var log: ng.ILogService;
    var httpBackend: ng.IHttpBackendService;
    var environment: EnvironmentConfiguration;
    var authenticationService : AuthenticationService;
    var geoPermissionsService: GeoPermissionsService;

    // load the service's module
    beforeEach(mock.module(EnvironmentModuleName));
    beforeEach(mock.module(GeoPermissionsModuleName));
    beforeEach(mock.module(AuthModuleName));
    beforeEach(mock.module(angularLogger));
    beforeEach(mock.module(angularCookies));
    // instantiate service
    beforeEach(inject(function (_$log_: ng.ILogService,
                                $httpBackend: ng.IHttpBackendService,
                                _EnvironmentConfiguration_: EnvironmentConfiguration,
                                _AuthenticationService_: AuthenticationService,
                                _GeoPermissionsService_: GeoPermissionsService) {
        log = _$log_;
        httpBackend = $httpBackend;
        geoPermissionsService = _GeoPermissionsService_;
        environment = _EnvironmentConfiguration_;
        authenticationService = _AuthenticationService_;

        spyOn(authenticationService, "getUserFromJwt").and.returnValue({ AccountUserId: 1000 });
        // TODO jasmine seems to have an issue with getters in typescript or at least this one.
        //spyOn(authenticationService, "user").and.returnValue({ AccountUserId: 1000 });

        httpBackend.whenGET(geoPermissionsService.ServiceUrl).respond(geoPermissionsResult);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Should have expected URLs', () => {
        expect(geoPermissionsService.ServiceUrl).toBe("https://pts.rcanalytics.local/api/v1/accountUser/1000/geoPermissions");
    });

    it('Should Receive Permissions Properly', () => {
        geoPermissionsService.GeoPermissionsSet.then((permissionSet : PropertySearch.Filters.GeoPermissions.GeoPermissionsSet) => {
            let geoPermissions : PropertySearch.Filters.GeoPermissions.GeoPermissions[] = permissionSet.geoPermissions;
            expect(lodash.size(geoPermissions)).toEqual(1);
            expect(lodash.size(geoPermissions[0].countryIds)).toEqual(243);
            expect(lodash.size(geoPermissions[0].stateProvidenceIds)).toEqual(0);
            expect(lodash.size(geoPermissions[0].zoneIds)).toEqual(0);
            expect(lodash.size(geoPermissions[0].propertyTypeIds)).toEqual(9);
        }, (error) => {
            fail(error);
        });
        httpBackend.flush();
    });
});

var geoPermissionsResult = [{
    "AccountUser_id": 79803,
    "StateProv_csv": null,
    "Country_csv": "1,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,186,187,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,233,234,235,236,237,238,239,240,241,242,243,244,245,247,248,249,293,298,299",
    "Zone_csv": null,
    "PropertyType_csv": "1,3,4,6,7,8,9,10,11",
    "FullPermission_fg": 0
}];
