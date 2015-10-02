/// <reference path="../../tsd.d.ts" />

import * as _ from "lodash";
import * as NodeUtils from "cd-node-utils";
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import {GeoPermissionsService} from "../GeoPermissions/GeoPermissionsModule";

"use strict";

class PlayersSearchService {
    public static ServiceName: string = "PlayersSearchService";
    public static $inject: string[] = ["$log", "$rootScope", "$q", "$http", EnvironmentConfiguration.ConstantName, GeoPermissionsService.ServiceName];

    private static UseProxy: boolean = true;

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $q: ng.IQService,
                private $http: ng.IHttpService,
                private environment: EnvironmentConfiguration,
                private geoPermissionsService: GeoPermissionsService) {
        this.$log = $log.getInstance("Shared.PlayersSearch.PlayersSearchService");



        this.$log.debug("Constructed", this);
    }

    public SearchPlayers(request: NodeUtils.PropertySearch.Requests.PlayersRequest): ng.IPromise<NodeUtils.PropertySearch.Responses.IPlayersResponse> {
        let promise: ng.IPromise<NodeUtils.PropertySearch.Responses.IPlayersResponse> = null;

        if (PlayersSearchService.UseProxy) {
            let url = this.proxiedServiceUrl();
            let defferable = this.$q.defer<NodeUtils.PropertySearch.Responses.IPlayersResponse>();

            this.$log.info("SearchPlayersInternal With Proxy", request);

            this.$http.post<NodeUtils.PropertySearch.Responses.IPlayersResponse>(url, request).then(
                (result: ng.IHttpPromiseCallbackArg<NodeUtils.PropertySearch.Responses.IPlayersResponse>)=> {
                    defferable.resolve(result.data);
                },
                (result: ng.IHttpPromiseCallbackArg<any>)=> {
                    this.$log.error("SearchPlayersInternal", result);
                    defferable.reject(result);
                });

            promise = defferable.promise;
        }
        else {
            let url = this.serviceURL(request.Currency);
            promise = this.geoPermissionsService.GeoPermissionsSet.then((geoPermissionSet: NodeUtils.PropertySearch.Filters.GeoPermissions.GeoPermissionsSet)=> {

                var playersSearchServiceRequest = NodeUtils.PropertySearch.buildPlayersSearchServiceRequest(request, geoPermissionSet);
                this.$log.info("SearchPlayersInternal Without Proxy", request, playersSearchServiceRequest);

                return this.$http.post(url, playersSearchServiceRequest)
                    .then((result: ng.IHttpPromiseCallbackArg<NodeUtils.PropertySearch.Responses.IPlayersResponse>)=> {
                    return result.data;
                },
                    (result: ng.IHttpPromiseCallbackArg<any>)=> {
                        this.$log.error("SearchPlayersInternal", result);
                        return result;
                    });
            }, (result: any)=> {
                this.$log.error("Error getting GeoPermissionSet");
            });
        }

        return promise;
    }

    private serviceURL(currency: NodeUtils.Measurements.Currency.Currency) {
        return this.environment.ServerAPIv1Url + "elasticsearch/pst_" + currency.name + '/_search';
    }

    private proxiedServiceUrl(): string {
        return this.environment.ServerAPIv1Url + 'propertySearch/players';
    }
}

export = PlayersSearchService;
