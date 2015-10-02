/// <reference path="../../tsd.d.ts" />

import * as angular from "angular";

var moduleName = "Parcels";
import ParcelsSearchService from './ParcelsSearchService';
import MapParcel from './MapParcel';
import MapMultiPolygon from './MapMultiPolygon';

angular.module(moduleName, [])
    .service(ParcelsSearchService.ServiceName, ParcelsSearchService);

export {moduleName, ParcelsSearchService, MapParcel, MapMultiPolygon};