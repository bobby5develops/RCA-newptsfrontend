/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");

import EnvironmentModule = require("../Environment/EnvironmentModule");
import GeoPermissionsModule = require("../GeoPermissions/GeoPermissionsModule");

export import ExcelDownloadService = require("./ExcelDownloadService");

export var moduleName = Constants.ModuleName;
angular.module(moduleName, [EnvironmentModule.moduleName, GeoPermissionsModule.Constants.ModuleName])
    .service(ExcelDownloadService.ServiceName, ExcelDownloadService);