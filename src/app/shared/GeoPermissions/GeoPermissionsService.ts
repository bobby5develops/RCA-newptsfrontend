/// <reference path="../../tsd.d.ts" />

import _                        = require("lodash");
import {PropertySearch} from 'cd-node-utils';
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import {AuthenticationService} from "../../shared/authentication/AuthenticationModule";

// ReSharper disable once WrongExpressionStatement
"use strict";

class GeoPermissionsService {
    public static ServiceName = "GeoPermissionsService";
    public static $inject = [
        "$log",
        "$rootScope",
        "$http",
        "$q",
        EnvironmentConfiguration.ConstantName,
        AuthenticationService.serviceName
    ];

    private permissionsSet: PropertySearch.Filters.GeoPermissions.GeoPermissionsSet;

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $http: ng.IHttpService,
                private $q: ng.IQService,
                private environment: EnvironmentConfiguration,
                private authenticationService: AuthenticationService) {
        this.$log = this.$log.getInstance("Shared.GeoPermissions.GeoPermissionsService");
        this.$log.debug("Constructed", this);
    }

    public get ServiceUrl(): string {
        return this.environment.ServerAPIv1Url + "accountUser/" + this.authenticationService.user.AccountUserId + "/geoPermissions";
    }

    /**
     * Main permissions request. This is technically a read only value so once we get it we do not need to update it,
     * so there's no need to watch it at this time. Updates to the permissions are done outside the session and user's
     * control.
     * @returns {any}
     * @constructor
     */
    public get GeoPermissionsSet(): ng.IPromise<PropertySearch.Filters.GeoPermissions.GeoPermissionsSet> {
        if (this.permissionsSet != null) {
            var defer = this.$q.defer<PropertySearch.Filters.GeoPermissions.GeoPermissionsSet>();
            defer.resolve(this.permissionsSet);
            return defer.promise;
        } else {
            return this.$http.get<PropertySearch.Filters.GeoPermissions.GeoPermissionsSet>(this.ServiceUrl)
                .then((response: any) => {

                    var permissions = response.data.map((item) => {
                        return new PropertySearch.Filters.GeoPermissions.GeoPermissions(
                            item.Country_csv,
                            item.StateProv_csv,
                            item.Zone_csv,
                            item.PropertyType_csv);
                    });

                    this.permissionsSet = new PropertySearch.Filters.GeoPermissions.GeoPermissionsSet(permissions);
                    return this.permissionsSet;

                }, (response: any) => {
                    var error = `Error fetching permissions: ${response}`;
                    this.$log.error(error);
                    return response;
                });
        }
    }
}

export default GeoPermissionsService;
