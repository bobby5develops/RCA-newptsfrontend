/// <reference path="../../tsd.d.ts" />

import * as angular from "angular";
import * as Constants from "./Constants";
import GeoShapeSearchService from "./GeoShapeSearchService";
import GeoShapeSearchServiceRequest from "./GeoShapeSearchServiceRequest";
import IGeoShapeSearchServiceResponse from "./IGeoShapeSearchServiceResponse";

angular.module(Constants.ModuleName, [])
    .service(GeoShapeSearchService.ServiceName, GeoShapeSearchService);

export {Constants, GeoShapeSearchService, GeoShapeSearchServiceRequest, IGeoShapeSearchServiceResponse}