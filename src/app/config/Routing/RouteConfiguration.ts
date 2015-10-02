/// <reference path="../../tsd.d.ts" />

import RouteConstants = require("./RouteConstants");

import { Constants as AppConstants, AppController } from "../../components/App/AppModule"

//Public
import PublicConstants = require("../../components/App.Public/Constants");

import AppHomeConstants = require("../../components/App.Public.Home/Constants");

import {
    Constants as AppContentConstants,
    LeadershipController,
    LeadershipItemController,
    SalesController,
    SalesItemController,
    CoverageController,
    DataPartnersController,
    GlossaryController,
    GlossaryItemController
} from "../../components/App.Public.Content/ContentModule";

import {Constants as AppLoginConstants} from "../../components/App.Public.Login/LoginModule";

import {LoginController} from "../../components/App.Public.Login/LoginModule";

//Private
import PrivateConstants = require("../../components/App.Private/Constants");

import PrivateHomeConstants = require("../../components/App.Private.Home/Constants");

import CapitalFlowsConstants = require("../../components/App.Private.CapitalFlows/Constants");

import InvestorsConstants = require("../../components/App.Private.Investors/Constants");

import {Constants as PropertiesConstants, PropertiesController} from "../../components/App.Private.Properties/PropertiesModule";

import {Constants as PlayersConstants, PlayersController, BuyersController, SellersController, BrokersController} from "../../components/App.Private.Properties.Players/PlayersModule";

import {Constants as TransactionsConstants, TransactionsController} from "../../components/App.Private.Properties.Transactions/TransactionsModule";

import AppPropertiesTrendsTradesConstants = require("../../components/App.Private.Properties.TrendsTrades/Constants");
import AppTrendsConstants = require("../../components/App.Private.Trends/Constants");

import {Constants as ProfileConstants, ProfileController} from "../../components/App.Private.User.Profile/ProfileModule";

import {Constants as PropertyDetailConstants, PropertyDetailController } from "../../components/App.Private.PropertyDetail/PropertyDetailModule";


class RouteConfiguration {
    public static $inject = ["$stateProvider", "$urlRouterProvider"];

    constructor(stateProvider: ng.ui.IStateProvider, urlRouterProvider: ng.ui.IUrlRouterProvider) {

        stateProvider.state({
            name: "app",
            templateUrl: AppConstants.appTemplateName,
            abstract: true,
            controller: AppController.controllerName,
            controllerAs: AppController.controllerAs
        });

        stateProvider.state({
            name: "app.public",
            templateUrl: PublicConstants.publicTemplateName,
            abstract: true
        });

        stateProvider.state({
            name: RouteConstants.homeStateName,
            url: "/",
            templateUrl: AppHomeConstants.homeTemplateName
        });

        stateProvider.state({
            name: RouteConstants.loginStateName,
            url: "/login",
            templateUrl:  AppLoginConstants.loginTemplateName,
            controller: LoginController.controllerName,
            controllerAs: LoginController.controllerAsName
        });

        // ******************************************************
        // Static Content pages (formerly "Public" folder on old website)
        // ******************************************************
        stateProvider.state({
            name: RouteConstants.aboutGCTStateName,
            url: "/aboutGCT",
            templateUrl: AppContentConstants.AboutGCTTemplateName
        });
        stateProvider.state({
            name: RouteConstants.aboutPTSStateName,
            url: "/aboutPTS",
            templateUrl: AppContentConstants.AboutPTSTemplateName
        });
        stateProvider.state({
            name: RouteConstants.aboutTrendsAndTradesStateName,
            url: "/aboutTrendsAndTrades",
            templateUrl: AppContentConstants.AboutTrendsAndTradesTemplateName
        });
        stateProvider.state({
            name: RouteConstants.aboutUSCTStateName,
            url: "/aboutUSCT",
            templateUrl: AppContentConstants.AboutUSCTTemplateName
        });
        stateProvider.state({
            name: RouteConstants.aboutUsStateName,
            url: "/aboutUs",
            templateUrl: AppContentConstants.AboutUsTemplateName
        });
        stateProvider.state({
            name: RouteConstants.analysisStateName,
            url: "/analysis",
            templateUrl: AppContentConstants.AnalysisTemplateName
        });
        stateProvider.state({
            name: RouteConstants.coverageStateName,
            url: "/coverage",
            templateUrl: AppContentConstants.CoverageTemplateName,
            controller: CoverageController.controllerName,
            controllerAs: CoverageController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.dataPartnersStateName,
            url: "/dataPartners",
            templateUrl: AppContentConstants.DataPartnersTemplateName,
            controller: DataPartnersController.controllerName,
            controllerAs: DataPartnersController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.glossaryStateName,
            url: "/glossary",
            templateUrl: AppContentConstants.GlossaryTemplateName,
            controller: GlossaryController.controllerName,
            controllerAs: GlossaryController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.glossaryItemStateName,
            url: "/glossary/{glossaryItem:string}",
            templateUrl: AppContentConstants.GlossaryItemTemplateName,
            controller: GlossaryItemController.controllerName,
            controllerAs: GlossaryItemController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.leadershipStateName,
            url: "/leadership",
            templateUrl: AppContentConstants.LeadershipTemplateName,
            controller: LeadershipController.controllerName,
            controllerAs: LeadershipController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.leadershipItemStateName,
            url: "/leadership/{leadershipItem:string}",
            templateUrl: AppContentConstants.LeadershipItemTemplateName,
            controller: LeadershipItemController.controllerName,
            controllerAs: LeadershipItemController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.salesStateName,
            url: "/sales",
            templateUrl: AppContentConstants.SalesTemplateName,
            controller: SalesController.controllerName,
            controllerAs: SalesController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.salesItemStateName,
            url: "/sales/{salesItem:string}",
            templateUrl: AppContentConstants.SalesItemTemplateName,
            controller: SalesItemController.controllerName,
            controllerAs: SalesItemController.controllerAsName
        });
        stateProvider.state({
            name: RouteConstants.methodologyStateName,
            url: "/methodology",
            templateUrl: AppContentConstants.MethodologyTemplateName
        });
        stateProvider.state({
            name: RouteConstants.ourDataStateName,
            url: "/ourData",
            templateUrl: AppContentConstants.OurDataTemplateName
        });
        stateProvider.state({
            name: RouteConstants.supportStateName,
            url: "/support",
            templateUrl: AppContentConstants.SupportTemplateName
        });
        // ******************************************************
        // End of Static Content pages (formerly "Public" folder on old website)
        // ******************************************************

        //private

        stateProvider.state({
            name: "app.private",
            templateUrl: PrivateConstants.privateTemplateName,
            abstract: true
        });

        stateProvider.state({
            name: RouteConstants.privateHomeStateName,
            url: "/home",
            templateUrl: PrivateHomeConstants.homeTemplateName,
            data: {
                authRequired: true
            }
        });

        stateProvider.state({
            name: RouteConstants.capitalFlowsStateName,
            url: "/capitalflows",
            templateUrl: CapitalFlowsConstants.capitalFlowsTemplateName,
            data: {
                authRequired: true
            }
        });

        stateProvider.state({
            name: RouteConstants.investorsStateName,
            url: "/investors",
            templateUrl: InvestorsConstants.investorsTemplateName,
            data: {
                authRequired: true
            }
        });

        stateProvider.state(<ng.ui.IState>{
            name: "app.private.properties",
            templateUrl: PropertiesConstants.propertiesTemplateName,
            abstract: true,
            controller: PropertiesController.controllerName,
            controllerAs: PropertiesController.controllerAs
        });

        stateProvider.state({
            name: RouteConstants.propertiesPlayersStateName,
            abstract: true,
            data: {
                authRequired: true
            },
            views: {
                "players@app.private.properties": {
                    templateUrl: PlayersConstants.playersTemplateName,
                    controller: PlayersController.controllerName,
                    controllerAs: PlayersController.controllerAsName
                }
            }
        });

        stateProvider.state({
            name: RouteConstants.propertiesTransactonsStateName,
            url: "/transactions?lat&lon&zoom&view",
            data: {
                authRequired: true
            },
            views: {
                "transactions@app.private.properties": {
                    templateUrl: TransactionsConstants.transactionsTemplateName,
                    controller: TransactionsController.controllerName,
                    controllerAs: TransactionsController.controllerAs
                }
            }
        });

        stateProvider.state({
            name: RouteConstants.propertiesPlayersBuyersStateName,
            url: "/transactions/players/buyers?lat&lon&zoom&view&ne&sw",
            data: {
                authRequired: true
            },
            views: {
                "buyers@app.private.properties.players": {
                    templateUrl: PlayersConstants.buyersTabTemplateName,
                    controller: BuyersController.controllerName,
                    controllerAs: BuyersController.controllerAs
                }
            }
        });

        stateProvider.state({
            name: RouteConstants.propertiesPlayersSellersStateName,
            url: "/transactions/players/sellers?lat&lon&zoom&view&ne&sw",
            data: {
                authRequired: true
            },
            views: {
                "sellers@app.private.properties.players": {
                    templateUrl: PlayersConstants.sellersTabTemplateName,
                    controller: SellersController.controllerName,
                    controllerAs: SellersController.controllerAs
                }
            }
        });

        stateProvider.state({
            name: RouteConstants.propertiesPlayersBrokersStateName,
            url: "/transactions/players/brokers?lat&lon&zoom&view&ne&sw",
            data: {
                authRequired: true
            },
            views: {
                "brokers@app.private.properties.players": {
                    templateUrl: PlayersConstants.brokersTabTemplateName,
                    controller: BrokersController.controllerName,
                    controllerAs: BrokersController.controllerAs
                }
            }
        });

        stateProvider.state({
            name: RouteConstants.propertiesTrendsTradesStateName,
            url: "/transactions/trendstrades",
            data: {
                authRequired: true
            },
            views: {
                "trendstrades@app.private.properties": {
                    templateUrl: AppPropertiesTrendsTradesConstants.trendsTradesTemplateName
                }
            }
        });

        stateProvider.state({
            name: RouteConstants.trendsStateName,
            url: "/trends",
            templateUrl: AppTrendsConstants.trendsTemplateName,
            data: {
                authRequired: true
            }
        });

        stateProvider.state({
            name: RouteConstants.profileStateName,
            url: "/user/profile",
            templateUrl: ProfileConstants.profileTemplateName,
            controller: ProfileController.ControllerName,
            controllerAs: ProfileController.ControllerAsName,
            data: {
                authRequired: true
            }
        });

        stateProvider.state({
            name: RouteConstants.propertyDetailStateName,
            url: "/property/detail?propertyId&dealId&propertyKeyId&currencyId&measurementId",
            templateUrl: PropertyDetailConstants.propertyDetailTemplateName,
            controller: PropertyDetailController.controllerName,
            controllerAs: PropertyDetailController.controllerAs,
            data: {
                authRequired: true
            },
            layout: {
                hideNavbar: true
            }
        });

        urlRouterProvider.otherwise("/");
    }
}

export = RouteConfiguration;
