/// <reference path="./tsd.d.ts" />

import jquery = require("jquery");
import lodash = require("lodash");
import angular = require("angular");
import d3 = require('d3');
import ngAnimate = require("angular-animate");
import ngCookies = require("angular-cookies");
import uiGmapgoogleMaps = require("angular-google-maps-shim");
import ngSanitize = require("angular-sanitize");
import ngResource = require("angular-resource");
import uiRouter = require("angular-ui-router");
import uiRouterExtras = require("ui-router-extras-shim");
import uiBootstrap = require("angular-bootstrap-shim");
import angularMoment= require("angular-moment");
import ngTranslate = require("angular-translate-shim");
import nemLogging = require("angular-simple-logger-shim");
import angularLogger = require("angular-logger-shim");
import ngNumeralJs = require("angular-numeraljs-shim");
import ngConfirm = require("angular-confirm-shim");
import ConfigModule = require("./config/ConfigModule");
import ngAwesomeSlider = require("angular-awesome-slider-shim");
import AppModule = require("./components/App/AppModule");


import PublicModule = require("./components/App.Public/PublicModule");
import HomeModule = require("./components/App.Public.Home/HomeModule");
import LoginModule = require("./components/App.Public.Login/LoginModule");
import PrivateModule = require("./components/App.Private/PrivateModule");
import PrivateHomeModule = require("./components/App.Private.Home/HomeModule");
import CapitalFlowsModule = require("./components/App.Private.CapitalFlows/CapitalFlowsModule");
import InvestorsModule = require("./components/App.Private.Investors/InvestorsModule");
import PropertiesModule = require("./components/App.Private.Properties/PropertiesModule");
import PlayersModule = require("./components/App.Private.Properties.Players/PlayersModule");
import PropertyDetailModule = require("./components/App.Private.PropertyDetail/PropertyDetailModule");
import TransactionsModule = require("./components/App.Private.Properties.Transactions/TransactionsModule");
import TrendsTradesModule = require("./components/App.Private.Properties.TrendsTrades/TrendsTradesModule");
import TrendsModule = require("./components/App.Private.Trends/TrendsModule");
import ProfileModule = require("./components/App.Private.User.Profile/ProfileModule");

import ContentModule = require("./components/App.Public.Content/ContentModule");

// ReSharper disable once WrongExpressionStatement
"use strict";

/* tslint:disable:no-string-literal */
window["$"] = window["jquery"] = jquery;
window["_"] = lodash;
window["d3"] = d3;

window["logWatchers"] = LogWatchers;

/* tslint:enable:no-string-literal */

angular.module("newPtsfrontend", [

    //3rd Party Dependencies
    uiGmapgoogleMaps,
    ngAnimate,
    ngCookies,
    ngSanitize,
    ngResource,
    uiRouter,
    uiRouterExtras,
    uiBootstrap,
    ngTranslate,
    angularLogger,
    angularMoment,
    ngNumeralJs,
    nemLogging,
    ngAwesomeSlider,
    ngConfirm,
    //Components
    ConfigModule.ModuleName,

    AppModule.moduleName,

    PublicModule.moduleName,
    HomeModule.moduleName,
    LoginModule.moduleName,

    PrivateModule.moduleName,
    PrivateHomeModule.moduleName,
    CapitalFlowsModule.moduleName,
    InvestorsModule.moduleName,
    PropertiesModule.moduleName,
    PlayersModule.moduleName,
    PropertyDetailModule.moduleName,
    TransactionsModule.moduleName,
    TrendsTradesModule.moduleName,
    TrendsModule.moduleName,
    TransactionsModule.moduleName,
    ProfileModule.moduleName,
    ContentModule.moduleName
]);


function LogWatchers(): void {
    var root = angular.element(document.getElementsByTagName('body'));

    var watchers = [];

    var f = function (element) {
        angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
            if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                    watchers.push(watcher);
                });
            }
        });

        angular.forEach(element.children(), function (childElement) {
            f(angular.element(childElement));
        });
    };

    f(root);

    // Remove duplicate watchers
    var watchersWithoutDuplicates = [];
    angular.forEach(watchers, function (item) {
        if (watchersWithoutDuplicates.indexOf(item) < 0) {
            watchersWithoutDuplicates.push(item);
        }
    });

    console.log(watchersWithoutDuplicates.length);
}
