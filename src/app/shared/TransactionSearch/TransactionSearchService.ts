/// <reference path="../../tsd.d.ts" />

import * as _ from "lodash";
import * as NodeUtils from "cd-node-utils";
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import {GeoPermissionsService} from "../GeoPermissions/GeoPermissionsModule";

"use strict";

interface IDeboucedSearchTransactions {
    (request: NodeUtils.PropertySearch.Requests.Base): void;
    cancel(): void;
}

class TransactionSearchService {
    public static ServiceName: string = "Shared.TransactionSearch.TransactionSearchService";
    public static $inject: string[] = ["$log", "$rootScope", "$q", "$http", EnvironmentConfiguration.ConstantName, GeoPermissionsService.ServiceName];

    public static transactionSearchExecutingEvent: string = "Shared.TransactionSearch.transactionSearchExecutingEvent";
    public static transactionSearchExecutedEvent: string = "Shared.TransactionSearch.transactionSearchExecutedEvent";

    private static UseProxy: boolean = true;

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $q: ng.IQService,
                private $http: ng.IHttpService,
                private environment: EnvironmentConfiguration,
                private geoPermissionsService: GeoPermissionsService) {

        this.$log = this.$log.getInstance("Shared.TransactionSearch.TransactionSearchService");

        this.debouncedSearchTransactionsInternal = <IDeboucedSearchTransactions>_.debounce(this.searchTransactionsDebouncedInternal, 100);

        this.$log.debug("Constructed", this);
    }

    private debouncedSearchTransactionsInternal: IDeboucedSearchTransactions;

    public searchTransactionsDebounced(request: NodeUtils.PropertySearch.Requests.TransactionRequest) {
        this.$log.debug("searchTransactionsDebounced", request);
        this.debouncedSearchTransactionsInternal(request);
    }

    public searchTransactions(request: NodeUtils.PropertySearch.Requests.TransactionRequest): ng.IPromise<NodeUtils.PropertySearch.Responses.ITransactionResponse> {
        this.$log.debug("searchTransactions", request);


        let promise: ng.IPromise<NodeUtils.PropertySearch.Responses.ITransactionResponse> = null;

        if (TransactionSearchService.UseProxy) {
            let url = this.proxiedServiceUrl();
            let defferable = this.$q.defer<NodeUtils.PropertySearch.Responses.ITransactionResponse>();

            this.$log.info("SearchTransactionsInternal With Proxy", request);

            this.$http.post<NodeUtils.PropertySearch.Responses.ITransactionResponse>(url, request).then(
                (result: ng.IHttpPromiseCallbackArg<NodeUtils.PropertySearch.Responses.ITransactionResponse>)=> {
                    defferable.resolve(result.data);
                },
                (result: ng.IHttpPromiseCallbackArg<any>)=> {
                    this.$log.error("SearchTransactionsInternal", result);
                    defferable.reject(result);
                });

            promise = defferable.promise;
        }
        else {
            let url = this.serviceURL(request);
            promise = this.geoPermissionsService.GeoPermissionsSet.then((geoPermissionSet: NodeUtils.PropertySearch.Filters.GeoPermissions.GeoPermissionsSet)=> {
                var transactionSearchServiceRequest = NodeUtils.PropertySearch.buildTransactionSearchServiceRequest(request, geoPermissionSet);

                this.$log.info("SearchTransactionsInternal Without Proxy", request, transactionSearchServiceRequest);

                return this.$http.post<NodeUtils.PropertySearch.Responses.ITransactionResponse>(url, transactionSearchServiceRequest)
                    .then((result: ng.IHttpPromiseCallbackArg<NodeUtils.PropertySearch.Responses.ITransactionResponse>)=> {
                    return result.data;
                }, (result: ng.IHttpPromiseCallbackArg<any>)=> {
                    this.$log.error("SearchTransactionsInternal", result);
                    return result;
                });

            }, (result: any)=> {
                this.$log.error("Error getting GeoPermissionSet");
            });
        }

        return promise;
    }

    public cancelDebouncedRequests() {
        this.$log.debug("cancelDebouncedRequests");
        this.debouncedSearchTransactionsInternal.cancel();
    }

    private serviceURL(request: NodeUtils.PropertySearch.Requests.Base): string {
        return this.environment.ServerAPIv1Url + "elasticsearch/pst_" + request.Currency.name + '/_search';
    }

    private proxiedServiceUrl():string{
        return this.environment.ServerAPIv1Url + 'propertySearch/transactions';
    }

    private searchTransactionsDebouncedInternal(request: NodeUtils.PropertySearch.Requests.TransactionRequest): void {
        this.$rootScope.$broadcast(TransactionSearchService.transactionSearchExecutingEvent, request);

        this.searchTransactions(request).then((response: NodeUtils.PropertySearch.Responses.ITransactionResponse)=> {

            this.$log.debug("Debounced Search Request Executed");
            this.$rootScope.$broadcast(TransactionSearchService.transactionSearchExecutedEvent, request, response);

        }, (result)=> {
            this.$log.error("Debounced Search Request Errored")
        });
    }
}

export = TransactionSearchService;
