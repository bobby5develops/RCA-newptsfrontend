/// <reference path="../../tsd.d.ts" />

'use strict';

import lodash = require("lodash");
import GeoShapeSearchServiceRequest from "./GeoShapeSearchServiceRequest";
import IGeoShapeSearchServiceResponse from "./IGeoShapeSearchServiceResponse";
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");

interface IDeboucedSearchGeoShapes {
    (request: GeoShapeSearchServiceRequest, defferable: ng.IDeferred<GeoJSON.GeoJsonObject>): void;
    cancel():void;
}

class GeoShapeSearchService {

    public static ServiceName = "Shared.GeoShapeSearch.GeoShapeSearchService";
    public static $inject = [
        "$log",
        "$q",
        "$http",
        EnvironmentConfiguration.ConstantName
    ];

    constructor(private $log: ng.ILogService,
                private $q: ng.IQService,
                private $http: ng.IHttpService, private environment: EnvironmentConfiguration) {
        this.$log = this.$log.getInstance("Shared.GeoShapeSearch.GeoShapeSearchService");

        this.debouncedSearchGeoShapesInternal = <IDeboucedSearchGeoShapes>lodash.debounce(this.SearchGeoShapesInternal, 100);

        this.$log.debug("Constructed", this);
    }

    protected debouncedSearchGeoShapesInternal: IDeboucedSearchGeoShapes;

    public SearchGeoShapes(request: GeoShapeSearchServiceRequest): ng.IPromise<GeoJSON.GeoJsonObject> {
        this.$log.debug("SearchGeoShapes", request);
        var defferable = this.$q.defer<GeoJSON.GeoJsonObject>();

        this.debouncedSearchGeoShapesInternal(request, defferable);

        return defferable.promise;
    }

    public SearchGeoShapesImmediate(request: GeoShapeSearchServiceRequest): ng.IPromise<GeoJSON.GeoJsonObject> {
        this.$log.debug("SearchGeoShapesImmediate", request);
        this.CancelRequests();
        var defferable = this.$q.defer<GeoJSON.GeoJsonObject>();

        this.SearchGeoShapesInternal(request, defferable);

        return defferable.promise;
    }

    public CancelRequests() {
        this.$log.debug("CancelRequests");
        this.debouncedSearchGeoShapesInternal.cancel();
    }

    protected SearchGeoShapesInternal(request: GeoShapeSearchServiceRequest, defferable: ng.IDeferred<GeoJSON.GeoJsonObject>): void {
        this.$log.info("SearchGeoShapesInternal With Proxy", request);

        var url = "https://pts.rcanalytics.local/api/v1/geojson/" + request.Field + "/" + request.Id;
        this.$http.get<IGeoShapeSearchServiceResponse>(url).then(
            (result: ng.IHttpPromiseCallbackArg<IGeoShapeSearchServiceResponse>)=> {
                if (lodash.has(result.data, 'hits.hits[0]._source')) {
                    var geoJson = <GeoJSON.GeoJsonObject>lodash.get(result.data, 'hits.hits[0]._source.shape');
                    defferable.resolve(geoJson);
                }
                else {
                    this.$log.error("SearchGeoShapesInternal GeoShape not found in response", request);
                    defferable.reject("GeoShape not found in response");
                }
            },
            (result: ng.IHttpPromiseCallbackArg<any>)=> {
                this.$log.error("SearchGeoShapesInternal", result);
                defferable.reject(result);
            });

    }
}

export default GeoShapeSearchService;
