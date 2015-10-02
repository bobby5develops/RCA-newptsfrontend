/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");

import UserPreferencesModule = require("../UserPreferences/UserPreferencesModule");
import EnvironmentModule = require("../Environment/EnvironmentModule");
import GeoPermissionsModule = require("../GeoPermissions/GeoPermissionsModule");

export import TransactionSearchService = require("./TransactionSearchService");

export var moduleName = Constants.ModuleName;
angular.module(moduleName, [EnvironmentModule.moduleName, UserPreferencesModule.moduleName, GeoPermissionsModule.Constants.ModuleName])
    .service(TransactionSearchService.ServiceName, TransactionSearchService);