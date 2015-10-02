/// <reference path="../../tsd.d.ts" />

'use strict';

import _                        = require("lodash");
import NodeUtils                = require('cd-node-utils');
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import {GeoPermissionsService} from "../GeoPermissions/GeoPermissionsModule";

class ExcelDownloadService {
    private static UseProxy = false;

    public static ServiceName = "Shared.TransactionSearch.ExcelDownloadService";
    public static $inject = ["$log", "$rootScope", "$q", "$http", "$window", EnvironmentConfiguration.ConstantName, GeoPermissionsService.ServiceName];

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $q: ng.IQService,
                private $http: ng.IHttpService,
                private $window: ng.IWindowService,
                private environment: EnvironmentConfiguration,
                private geoPermissionsService: GeoPermissionsService) {

        this.$log = this.$log.getInstance("Shared.TransactionSearch.ExcelDownloadService");

        this.$log.debug("Constructed", this);
    }

    private serviceURL(request: NodeUtils.PropertySearch.Requests.Base): string {
        return this.environment.ServerAPIv1Url + "excelexport/noproxy/deals/pst_" + request.Currency.name;
    }

    private proxiedServiceUrl(): string {
        return this.environment.ServerAPIv1Url + 'excelexport/deals';
    }

    public downloadExcel(request: NodeUtils.PropertySearch.Requests.TransactionRequest): void {
        this.$log.debug("DownloadExcel", request);

        var promise: ng.IPromise<string> = null;

        if (ExcelDownloadService.UseProxy) {
            throw "Not Implemented";

            this.$log.info("Requesting Excel download with Proxy", request);

            let url = this.proxiedServiceUrl();

            promise = this.$http.post<NodeUtils.PropertySearch.Responses.ITransactionResponse>(url, request).then(
                (result: ng.IHttpPromiseCallbackArg<string>)=> {
                    return result.data;
                },
                (result: ng.IHttpPromiseCallbackArg<any>)=> {
                    this.$log.error("Error requesting Excel download", result);
                });
        }

        else {
            let url = this.serviceURL(request);

            promise = this.geoPermissionsService.GeoPermissionsSet.then((geoPermissionSet: NodeUtils.PropertySearch.Filters.GeoPermissions.GeoPermissionsSet)=> {
                var transactionSearchServiceRequest = NodeUtils.PropertySearch.buildTransactionSearchServiceRequest(request, geoPermissionSet);

                this.$log.info("Requesting Excel download without Proxy", request, transactionSearchServiceRequest);

                return this.$http.post<NodeUtils.PropertySearch.Responses.ITransactionResponse>(url, transactionSearchServiceRequest).then(
                    (result: ng.IHttpPromiseCallbackArg<string>)=> {
                        if (result.data == null) {
                            throw "Excel download key is null";
                        }

                        return result.data;
                    },
                    (result: ng.IHttpPromiseCallbackArg<any>)=> {
                        this.$log.error("Error requesting Excel download", result);
                    });

            }, (result: any)=> {
                this.$log.error("Error getting GeoPermissionSet");
            });
        }

        promise.then((excelKey: string)=> {
            this.$log.debug("Requesting Excel Download", excelKey);
            let path = this.environment.ServerAPIv1Url + "excelexport/download/" + excelKey;
            this.$window.open(path)
        })
    }
}

export = ExcelDownloadService;
