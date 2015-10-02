/// <reference path="../../tsd.d.ts" />
import lodash = require("lodash");
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import MapMultiPolygon from "./MapMultiPolygon";
import MapParcel from "./MapParcel";
import { PropertySearch } from "cd-node-utils";

'use strict';

interface IDeboucedParcelsSearch {
    (request: PropertySearch.Requests.ParcelsSearchServiceRequest, defferable: ng.IDeferred<PropertySearch.Responses.IParcelsSearchServiceResponse>): void;
    cancel(): void;
}

export default class ParcelsSearchService {
    private static UseProxy = false;

    public static ServiceName = "ParcelsSearchService";
    public static $inject = [
        "$log",
        "$q",
        "$http",
        EnvironmentConfiguration.ConstantName
    ];

    private debouncedSearchParcelsInternal: IDeboucedParcelsSearch;

    constructor(private $log: ng.ILogService,
                private $q: ng.IQService,
                private $http: ng.IHttpService,
                private environment: EnvironmentConfiguration) {
        this.$log = $log.getInstance("shared.Parcels.ParcelsSearchService");

        this.debouncedSearchParcelsInternal = <IDeboucedParcelsSearch>lodash.debounce(this.SearchParcelsInternal, 100);

        this.$log.debug("Constructed", this);
    }

    public SearchParcels(request: PropertySearch.Requests.ParcelsSearchServiceRequest): ng.IPromise<PropertySearch.Responses.IParcelsSearchServiceResponse> {
        this.$log.debug("SearchParcels", request);
        let defferable = this.$q.defer<PropertySearch.Responses.IParcelsSearchServiceResponse>();

        this.debouncedSearchParcelsInternal(request, defferable);

        return defferable.promise;
    }

    private SearchParcelsInternal(request: PropertySearch.Requests.ParcelsSearchServiceRequest, defferable: ng.IDeferred<PropertySearch.Responses.IParcelsSearchServiceResponse>): void {
        if (ParcelsSearchService.UseProxy) {
            this.$log.info("ParcelsSearchService With Proxy", request);

            throw "Not Implemented";
        } else {
            let esRequest = PropertySearch.buildParcelsSearchServiceRequest(request);

            this.$log.info("SearchParcelsInternal", request, esRequest);

            this.$http.post(this.serviceURL(), esRequest)
                .then(
                (result: ng.IHttpPromiseCallbackArg<PropertySearch.Responses.IParcelsSearchServiceResponse>) => {
                    let parcels = <PropertySearch.Responses.IParcelsSearchServiceResponse>this.constructParcels(result.data);
                    defferable.resolve(parcels);
                },
                (result: ng.IHttpPromiseCallbackArg<any>) => {
                    this.$log.error("SearchParcelsInternal", result);
                    defferable.reject(result);
                });
        }
    }

    public SearchParcelsImmediate(request: PropertySearch.Requests.ParcelsSearchServiceRequest): ng.IPromise<PropertySearch.Responses.IParcelsSearchServiceResponse> {
        this.$log.debug("SearchParcelsImmediate", request);
        this.CancelRequests();
        let defferable = this.$q.defer<PropertySearch.Responses.IParcelsSearchServiceResponse>();

        this.SearchParcelsInternal(request, defferable);

        return defferable.promise;
    }

    public CancelRequests(): void {
        this.$log.debug("CancelRequests");
        this.debouncedSearchParcelsInternal.cancel();
    }


    public serviceURL(): string {
        return this.environment.ServerAPIv1Url + "elasticsearch/parcel/_search";
    }

    private constructParcels(data): MapParcel[] {
        let hits: any[] = lodash.get<any[]>(data, "hits.hits");
        let i: number = 0;
        return hits.map<any>((item: any) => {
            let address: string = item._source.address;
            let ownerName: string = item._source.ownername;
            let coordinates: number[][][] = item._source.geometry.coordinates;
            let polygon: MapMultiPolygon = new MapMultiPolygon(coordinates);
            return new MapParcel(i++, address, ownerName, polygon);
        });
    }
}
