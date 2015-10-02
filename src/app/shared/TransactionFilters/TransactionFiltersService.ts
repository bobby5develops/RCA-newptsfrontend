/// <reference path="../../tsd.d.ts" />

import * as lodash from "lodash";
import * as NodeUtils from "cd-node-utils";

import {GeoShapeSearchService, GeoShapeSearchServiceRequest} from "../GeoShapeSearch/GeoShapeSearchModule";
import {GeoPermissionsService} from "../GeoPermissions/GeoPermissionsModule";
import {IPropertyTypeFilterAggregation} from "./PropertyTypeFilters/PropertyTypeFilterAggregation";

import UserPreferencesService = require("../UserPreferences/UserPreferencesService");
import Suggestion = require("../AutocompleteWidget/Suggestion");
import ViewModeEnum from "./ViewModeEnum";

class TransactionFiltersService {
    public static serviceName = "TransactionFiltersService";

    public static pinZoomLevel = 10;
    public static countryZoomLevel = 4;

    public static transactionFiltersChangedEvent = "TransactionFiltersService.TransactionFiltersChangedEvent";
    public static selectedSuggestionGeoShapeChangedEvent = "TransactionFiltersService.SelectedSuggestionGeoShapeChangedEvent";

    public searchGeoShape: GeoJSON.GeoJsonObject = null;

    public GeographyFilter: {include: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]; exclude: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]} = {
        include: null,
        exclude: null
    };

    public PropertyTypeFilter: NodeUtils.PropertySearch.Filters.PropertyTypes.IPropertyTypeFilter[] = [];
    public propertyTypeFilterAggregations: {[key:string]: IPropertyTypeFilterAggregation} = {};

    public TransactionSearchFilters: NodeUtils.PropertySearch.Filters.TransactionCharacteristics = new NodeUtils.PropertySearch.Filters.TransactionCharacteristics();

    public PropertyDetailsFilter: NodeUtils.PropertySearch.Filters.PropertyCharacteristics = new NodeUtils.PropertySearch.Filters.PropertyCharacteristics();

    public keywordFilters: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[] = [];
    public companyFilters: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[] = [];

    public MapZoom: number = null;

    public MapCenter: AngularGoogleMaps.IPoint = {
        latitude: null,
        longitude: null
    };

    public viewMode: ViewModeEnum = ViewModeEnum.Split;

    public mapBounds: AngularGoogleMaps.IBounds = {
        northeast: {latitude: null, longitude: null},
        southwest: {latitude: null, longitude: null}
    };

    public lastShapeDrawn: google.maps.MVCObject = null;

    public selectedSuggestionMapFeature: google.maps.Data.Feature = null;

    public selectedSuggestion: Suggestion = null;

    public get MapZoomLevel(): NodeUtils.Map.Zoom {
        if (this.MapZoom <= TransactionFiltersService.countryZoomLevel) {
            return NodeUtils.Map.Zoom.Country;
        }
        else if (this.MapZoom <= TransactionFiltersService.pinZoomLevel) {
            return NodeUtils.Map.Zoom.Market;
        }
        else {
            return NodeUtils.Map.Zoom.Pin;
        }
    }

    public static $inject = ["$log", "$rootScope", "$q", UserPreferencesService.serviceName, GeoShapeSearchService.ServiceName];

    constructor(private $log: ng.ILogService, private $rootScope: ng.IRootScopeService, private $q: ng.IQService, private userPreferencesService: UserPreferencesService, private geoShapeSearchService: GeoShapeSearchService) {
        this.$log = this.$log.getInstance("Shared.TransactionFilters.TransactionFiltersService");

        var watchedUserPreferences: NodeUtils.UserPreferences.IUserPreferences = null;
        var loadUserPreferences = () => {
            userPreferencesService.userPreferences.then(
                (userPreferences: NodeUtils.UserPreferences.IUserPreferences)=> {
                    watchedUserPreferences = userPreferences;
                },
                (result: any) => {
                });
        };
        loadUserPreferences();
        $rootScope.$watch(
            () => {
                return {
                    MapBounds: this.mapBounds,
                    MapZoomLevel: this.MapZoomLevel,
                    SearchGeoShape: this.searchGeoShape,
                    PropertyTypeFilter: this.PropertyTypeFilter,
                    TransactionSearchFilters: this.TransactionSearchFilters,
                    PropertyDetailsFilter: this.PropertyDetailsFilter,
                    CompanyFilters: this.companyFilters,
                    KeywordFilters: this.keywordFilters,
                    GeographyFilter: this.GeographyFilter,
                    UserPreferences: watchedUserPreferences,
                };
            }, (newValue: any, oldValue: any) => {
                if (!angular.equals(newValue, oldValue)) {
                    this.$log.debug("Transaction Filters Changed");

                    this.propertyTypeFilterAggregations = {};

                    this.getTransactionSearchServiceRequest().then(
                        (transactionSearchServiceRequest: NodeUtils.PropertySearch.Requests.TransactionRequest)=> {
                            this.$rootScope.$broadcast(TransactionFiltersService.transactionFiltersChangedEvent, transactionSearchServiceRequest);
                        },
                        (result) => {
                        });
                }
            }, true);

        $rootScope.$on(UserPreferencesService.userPreferencesLoadedEvent, () => loadUserPreferences());

        this.$log.debug("Constructed", this);
    }

    public setGeographyFilters(include: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[], exclude: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]) {
        this.GeographyFilter = {include: include, exclude: exclude};
    }

    public getTransactionSearchServiceRequest(): ng.IPromise<NodeUtils.PropertySearch.Requests.TransactionRequest> {
        return this.userPreferencesService.userPreferences.then((userPreferences: NodeUtils.UserPreferences.IUserPreferences)=> {
            return new NodeUtils.PropertySearch.Requests.TransactionRequest(this.mapBounds, this.MapZoomLevel, this.searchGeoShape,
                this.PropertyTypeFilter, this.TransactionSearchFilters, this.PropertyDetailsFilter,
                this.companyFilters, this.keywordFilters,
                this.GeographyFilter.include, this.GeographyFilter.exclude, userPreferences.currency);
        }, (result: any) => {
            this.$log.error("Error getting UserPreferences");
            return result;
        });
    }

    public getPlayerSearchServiceRequest(role: string): ng.IPromise<NodeUtils.PropertySearch.Requests.PlayersRequest> {
        return this.userPreferencesService.userPreferences.then((userPreferences: NodeUtils.UserPreferences.IUserPreferences)=> {
            return new NodeUtils.PropertySearch.Requests.PlayersRequest(this.mapBounds, this.MapZoomLevel, this.searchGeoShape,
                this.PropertyTypeFilter, this.TransactionSearchFilters, this.PropertyDetailsFilter,
                this.companyFilters, this.keywordFilters,
                this.GeographyFilter.include, this.GeographyFilter.exclude, userPreferences.currency, role);
        }, (result: any) => {
            this.$log.error("Error getting UserPreferences");
            return result;
        });
    }
}

export default TransactionFiltersService;
