/// <reference path="../../tsd.d.ts" />

import * as angular from "angular";
import * as Constants from "./Constants";
import GeoPermissionsService from "./GeoPermissionsService";
var moduleName = Constants.ModuleName;

angular.module(Constants.ModuleName, [])
    .service(GeoPermissionsService.ServiceName, GeoPermissionsService);

export {Constants, GeoPermissionsService, moduleName}
