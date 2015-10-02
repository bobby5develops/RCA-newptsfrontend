/// <reference path="../tsd.d.ts" />

import * as angular from "angular";

export var ModuleName: string = "Components.Config";

import AuthenticationModule = require("../shared/Authentication/AuthenticationModule");

import AuthenticationConfiguration = require("./Authentication/AuthenticationConfiguration");
import AuthInterceptorService = require("./Authentication/AuthInterceptorService");

import {Constants as GeoPermissionConstants} from "../shared/GeoPermissions/GeoPermissionsModule";

import RouteConfiguration = require("./Routing/RouteConfiguration");
import RouteMediator = require("./Routing/RouteMediator");

import TranslateConfiguration = require("./Translate/TranslateConfiguration");
import TranslationLoaderFactory = require("./Translate/TranslationLoaderFactory");

import GoogleMapsConfiguration = require("./GoogleMapsConfiguration");

angular.module(ModuleName, [AuthenticationModule.moduleName, GeoPermissionConstants.ModuleName])
    .service(AuthInterceptorService.serviceName, AuthInterceptorService)
    .config(AuthenticationConfiguration)
    .config(RouteConfiguration)
    .run(["$rootScope", "$state", ($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService) => {
        (<any>$rootScope).$state = $state;
    }])
    .config(GoogleMapsConfiguration)
    .run(RouteMediator)
    .config(TranslateConfiguration)
    .factory(TranslationLoaderFactory.FactoryName, TranslationLoaderFactory.Factory);
