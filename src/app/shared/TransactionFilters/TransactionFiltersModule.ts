/// <reference path="../../tsd.d.ts" />

import * as angular from "angular";

import * as Constants from "./Constants";
import * as Templates from "./Templates";
import TransactionFiltersService from "./TransactionFiltersService";
import ViewModeEnum from "./ViewModeEnum";

import * as UserPreferencesModule from "../UserPreferences/UserPreferencesModule";
import * as AutocompleteWidget from "../AutocompleteWidget/AutocompleteWidget";
import * as GeoPermissionsModule from "../GeoPermissions/GeoPermissionsModule";

import * as PropertyTypeFilterDirective from "./PropertyTypeFilters/PropertyTypeFilterDirective";
import PropertyTypeFilterController from "./PropertyTypeFilters/PropertyTypeFilterController";
import {IPropertyTypeFilterAggregation} from "./PropertyTypeFilters/PropertyTypeFilterAggregation";

import * as PropertyDetailsFilterMenuDirective from "./PropertyDetailsFilterMenuWidget/PropertyDetailsFilterMenuDirective";

import * as GeographyFilterDirective from "./GeographyFilterWidget/GeographyFilterDirective";
import * as GeographyFilterItemDirective from "./GeographyFilterWidget/GeographyFilterItemDirective";

import CompanyFiltersController from "./CompanyFilters/CompanyFiltersController";
import {CompanyFiltersDirective, CompanyFiltersDirectiveName} from "./CompanyFilters/CompanyFiltersDirective";

import {CompanyFilterItemController} from "./CompanyFilters/CompanyFilterItemController";
import * as CompanyFilterItemDirective from "./CompanyFilters/CompanyFilterItemDirective";

import KeywordFilterItemController from "./KeywordFilters/KeywordFilterItemController";
import {KeywordFilterItemDirective, KeywordFilterItemDirectiveName} from "./KeywordFilters/KeywordFilterItemDirective";
import KeywordFiltersController from "./KeywordFilters/KeywordFiltersController";
import {KeywordFiltersDirective, KeywordFiltersDirectiveName} from "./KeywordFilters/KeywordFiltersDirective";

import * as GeoAutocompleteDirective from "./GeoAutocompleteWidget/GeoAutocompleteDirective";
import {GeoAutocompleteController} from "./GeoAutocompleteWidget/GeoAutocompleteController";

import * as DateRangeDirective from "./DateRangeWidget/DateRangeDirective";

import * as PinViewsDirective from "./PinViewsWidget/PinViewsDirective";

import * as TransactionsFilterMenuDirective from "./TransactionsFilterMenuWidget/TransactionsFilterMenuDirective";

import {default as TransactionFiltersRouteHelperService, TransactionFiltersRouteOptions, ITransactionFiltersRouteOptions} from "./TransactionFiltersRouteHelperService";

angular.module(Constants.ModuleName, [Templates,
        UserPreferencesModule.moduleName,
        AutocompleteWidget.moduleName, GeoPermissionsModule.Constants.ModuleName])
    .service(TransactionFiltersRouteHelperService.serviceName, TransactionFiltersRouteHelperService)
    .service(TransactionFiltersService.serviceName, TransactionFiltersService)

    .controller(PropertyTypeFilterController.controllerName, PropertyTypeFilterController)
    .directive(PropertyTypeFilterDirective.directiveName, PropertyTypeFilterDirective.directive)

    .directive(PropertyDetailsFilterMenuDirective.directiveName, PropertyDetailsFilterMenuDirective.directive)

    .directive(GeographyFilterDirective.directiveName, GeographyFilterDirective.directive)
    .directive(GeographyFilterItemDirective.directiveName, GeographyFilterItemDirective.directive)

    .controller(CompanyFiltersController.controllerName, CompanyFiltersController)
    .directive(CompanyFiltersDirectiveName, CompanyFiltersDirective)

    .controller(CompanyFilterItemController.controllerName, CompanyFilterItemController)
    .directive(CompanyFilterItemDirective.directiveName, CompanyFilterItemDirective.directive)
    .controller(KeywordFilterItemController.controllerName, KeywordFilterItemController)
    .directive(KeywordFilterItemDirectiveName, KeywordFilterItemDirective)
    .controller(KeywordFiltersController.controllerName, KeywordFiltersController)
    .directive(KeywordFiltersDirectiveName, KeywordFiltersDirective)

    .controller(GeoAutocompleteController.controllerName, GeoAutocompleteController)
    .directive(GeoAutocompleteDirective.directiveName, GeoAutocompleteDirective.directive)

    .directive(DateRangeDirective.directiveName, DateRangeDirective.directive)
    .directive(PinViewsDirective.directiveName, PinViewsDirective.directive)
    .directive(TransactionsFilterMenuDirective.directiveName, TransactionsFilterMenuDirective.directive);

export {
    Constants,
    Templates,
    TransactionFiltersService,
    CompanyFiltersController,
    CompanyFilterItemController,
    GeoAutocompleteController,
    ViewModeEnum,
    TransactionFiltersRouteHelperService,
    TransactionFiltersRouteOptions,
    ITransactionFiltersRouteOptions,
    PropertyTypeFilterController,
    IPropertyTypeFilterAggregation
};
