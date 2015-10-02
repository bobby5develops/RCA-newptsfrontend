/// <reference path="../../tsd.d.ts" />

import lodash = require("lodash");
import * as NodeUtils from "cd-node-utils";
import * as angular from "angular"

import Constants = require("./Constants");
import PinModeEnum = require("./PinModeEnum");
import IPinTransactionItem = require("./IPinTransactionItem");
import IBubbleTransactionItem = require("./IBubbleTransactionItem");

import GeoShapeSearchService from "../../shared/GeoShapeSearch/GeoShapeSearchService";
import GeoShapeSearchServiceRequest from "../../shared/GeoShapeSearch/GeoShapeSearchServiceRequest";
import IGeoShapeSearchServiceResponse = require("../../shared/GeoShapeSearch/IGeoShapeSearchServiceResponse");

import {
    TransactionFiltersService,
    ViewModeEnum,
    TransactionFiltersRouteHelperService,
    TransactionFiltersRouteOptions,
    IPropertyTypeFilterAggregation} from "../../shared/TransactionFilters/TransactionFiltersModule";

import TransactionSearchService = require("../../shared/TransactionSearch/TransactionSearchService");
import {AuthenticationService} from "../../shared/authentication/AuthenticationModule";
import UserPreferencesService = require("../../shared/userPreferences/UserPreferencesService");
import {MapParcel, ParcelsSearchService} from "../../shared/Parcels/ParcelsModule";
import {ExcelDownloadService} from "../../shared/ExcelDownload/ExcelDownloadModule";
import Service = require("../../shared/Authentication/AuthenticationService");
import EnvironmentConfiguration = require("../../shared/Environment/EnvironmentConfiguration");
import {IPropertyDetailRequest} from "../../shared/PropertyDetail/IPropertyDetailRequest"

import Suggestion = require("../../shared/AutocompleteWidget/Suggestion");

import MarkerIconFactory = require("../../shared/Mapping/PinFactory");
import MapMarker = require("../../shared/Mapping/MapMarker");
import ITransactionPinRow = require("../../shared/Mapping/ITransactionPinRow");

import {SaveShapeModalController, ISavedShape, SavedCircle, SavedPolygon, SavedRectangle} from "../../shared/CustomShapes/CustomShapeModule";
import GeographyFilerController = require("../../shared/TransactionFilters/GeographyFilterWidget/GeographyFilterController");

import { Constants as UtilsConstants, Map, Measurements, PropertySearch, UserPreferences } from "cd-node-utils";
import GeographyFilterController = require("../../shared/TransactionFilters/GeographyFilterWidget/GeographyFilterController");

import * as RouteConstants from "../../config/Routing/RouteConstants";

// ReSharper disable once WrongExpressionStatement
"use strict";

class TransactionsController {
    public static controllerName = "TransactionsController";
    public static controllerAs = "transactionsCtrl";

    public mapControl: AngularGoogleMaps.IMapControlAccessor;
    public mapReference: google.maps.Map;
    public mapEvents: AngularGoogleMaps.IMapEvents = {
        click: (event: google.maps.MouseEvent) => {
        },
        rightclick: (event: google.maps.MouseEvent) => {
            this.lastShapeDrawn = null;
        }
    };
    public geoJsonShapeOptions = {
        strokeColor: "#ea7517",
        strokeOpacity: 0.66,
        strokeWeight: 2,
        fillColor: "#ea7517",
        fillOpacity: 0.26,
        clickable: false,
        editable: false,
        zIndex: 1
    };
    public polyShapeOptions = {
        strokeColor: "#ea7517",
        strokeOpacity: 0.66,
        strokeWeight: 2,
        fillColor: "#ea7517",
        fillOpacity: 0.26,
        clickable: false,
        editable: true,
        zIndex: 10
    };
    private autoPanFlag: boolean = false;

    public mapParcelEvents = {
        // TODO JB: Not very angular but they do not make it easy for polygons to show windows, perhaps more ng way.
        click: (polygon, event, $scope) => {
            if (polygon && $scope && $scope.$parent) {
                var parcel = $scope.$parent.parcel;
                var content =
                    '<div>' +
                    '<div>' + parcel.address + '</div>' +
                    '<div>' + parcel.ownername + '</div>' +
                    '</div>';
                var infoWindow = new google.maps.InfoWindow({content: content});

                var bounds = new google.maps.LatLngBounds();
                var polygonCoords = polygon.getPath().getArray();
                for (var i = 0; i < polygonCoords.length; i++) {
                    bounds.extend(polygonCoords[i]);
                }
                infoWindow.setPosition(bounds.getCenter());
                infoWindow.open(polygon.getMap());
            }
        },
        mouseover: (polygon, event, model) => {
            model.fill.opacity = 0.5;
        },
        mouseout: (polygon, event, model) => {
            model.fill.opacity = 0.0;
        }
    };
    public mapDrawingManagerOptions: google.maps.drawing.DrawingManagerOptions = null;
    public mapDrawingManager: AngularGoogleMaps.IMapDrawingManagerAccessor = {};
    private previousMapBounds: AngularGoogleMaps.IBounds;

    private get lastShapeDrawn(): google.maps.MVCObject {
        return this.transactionFiltersService.lastShapeDrawn;
    }

    private set lastShapeDrawn(value: google.maps.MVCObject) {
        this.selectedSuggestion = null;

        if (this.lastShapeDrawn != null) {
            if (this.lastShapeDrawn instanceof google.maps.Circle) {
                let circle = <google.maps.Circle>this.lastShapeDrawn;
                circle.setMap(null);
            } else if (this.lastShapeDrawn instanceof google.maps.Rectangle) {
                let rectangle = <google.maps.Rectangle>this.lastShapeDrawn;
                rectangle.setMap(null);
            } else if (this.lastShapeDrawn instanceof google.maps.Polygon) {
                let polygon = <google.maps.Polygon>this.lastShapeDrawn;
                polygon.setMap(null);
            } else {
                throw "Unknown Shape Type";
            }
        }

        if (value == null) {
            this.transactionFiltersService.searchGeoShape = null;
            this.mapReference.controls[google.maps.ControlPosition.BOTTOM_RIGHT].clear();
        } else {
            var divLegend: HTMLElement = document.createElement("DIV");
            divLegend.innerHTML = this.$templateCache.get<string>(Constants.customShapeLegendTemplateName);
            divLegend.title = "Save Custom Shape";
            divLegend.setAttribute('class', 'bottomRight');
            var controlElem = this.$compile(divLegend)(this.$scope);
            this.mapReference.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(controlElem[0]);

            if (value instanceof google.maps.Circle) {
                let circle = <google.maps.Circle>value;

                let updateShape = () => {
                    //http://stackoverflow.com/questions/22229959/how-can-i-convert-a-google-maps-circle-into-geojson
                    var generateGeoJSONCircle = (center, radius, numSides = 360): GeoJSON.GeometryObject => {
                        var points = [],
                            degreeStep = 360 / numSides;

                        for (var i = 0; i < numSides; i++) {
                            var gpos = google.maps.geometry.spherical.computeOffset(center, radius, degreeStep * i);
                            points.push([gpos.lng(), gpos.lat()]);
                        }

                        // Duplicate the last point to close the geojson ring
                        points.push(points[0]);

                        return {
                            type: 'Polygon',
                            coordinates: [points]
                        };
                    };

                    this.transactionFiltersService.searchGeoShape = generateGeoJSONCircle(circle.getCenter(), circle.getRadius());
                };

                circle.addListener("center_changed", () => {
                    this.$log.debug("Circle center changed");
                    updateShape();
                    this.$scope.$apply();
                });

                circle.addListener("radius_changed", () => {
                    this.$log.debug("Circle radius changed");
                    updateShape();
                    this.$scope.$apply();
                });

                updateShape();
            } else if (value instanceof google.maps.Rectangle) {
                let rectangle = <google.maps.Rectangle>value;

                let updateShape = () => {
                    let bounds = rectangle.getBounds();
                    let northEast = bounds.getNorthEast();
                    let southWest = bounds.getSouthWest();

                    var coords = [];
                    coords.push([northEast.lng(), northEast.lat()]);
                    coords.push([southWest.lng(), northEast.lat()]);
                    coords.push([southWest.lng(), southWest.lat()]);
                    coords.push([northEast.lng(), southWest.lat()]);
                    coords.push([northEast.lng(), northEast.lat()]);

                    this.transactionFiltersService.searchGeoShape = {
                        "type": "Polygon",
                        "coordinates": [coords]
                    };
                };

                rectangle.addListener("bounds_changed", () => {
                    this.$log.debug("Rectangle bounds changed");
                    updateShape();
                    this.$scope.$apply();
                });

                updateShape();
            } else if (value instanceof google.maps.Polygon) {
                let polygon = <google.maps.Polygon>value;

                let updateShape = () => {
                    let points = polygon.getPath().getArray();
                    let coords = [];
                    for (let i = 0; i < points.length; i++) {
                        coords.push([points[i].lng(), points[i].lat()]);
                    }
                    coords.push(coords[0]);

                    this.transactionFiltersService.searchGeoShape = {
                        "type": "polygon",
                        "coordinates": [coords]
                    };
                };

                polygon.addListener("drag_end", () => {
                    this.$log.debug("Polygon dragged");
                    updateShape();
                    this.$scope.$apply();
                });

                updateShape();
            } else {
                throw "Unknown Shape Type";
            }
        }

        this.transactionFiltersService.lastShapeDrawn = value;
    }

    public get selectedSuggestion(): Suggestion {
        return this.transactionFiltersService.selectedSuggestion;
    }

    public set selectedSuggestion(value: Suggestion) {
        if (!angular.equals(this.transactionFiltersService.selectedSuggestion, value)) {
            if (this.transactionFiltersService.selectedSuggestionMapFeature) {
                this.mapReference.data.remove(this.transactionFiltersService.selectedSuggestionMapFeature);
            }

            if (value != null) {
                this.lastShapeDrawn = null;

                var field = lodash.keys(value.value)[0];
                var fieldValue = value.value[field];

                field = field.slice(0, field.indexOf('_')).toLowerCase();

                var geoShapeSearchServiceRequest = new GeoShapeSearchServiceRequest(field, fieldValue);
                this.geoShapeSearchService.SearchGeoShapes(geoShapeSearchServiceRequest)
                    .then((geoJson: GeoJSON.GeoJsonObject) => {

                        this.transactionFiltersService.searchGeoShape = geoJson;

                        if (geoJson != null) {
                            var feature = <GeoJSON.Feature>{
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": geoJson.type,
                                    "coordinates": (<GeoJSON.GeometryObject>geoJson).coordinates
                                }
                            };
                            this.transactionFiltersService.selectedSuggestionMapFeature = this.mapReference.data.addGeoJson(feature)[0];

                            const suggestionLatLngBounds = this.getBoundsFromGoogleMapsItem(this.transactionFiltersService.selectedSuggestionMapFeature.getGeometry());
                            this.zoomMapToLatLngBounds(suggestionLatLngBounds);
                        }

                        return geoJson;
                    }, (result: any) => {
                        return result;
                    });
            }

            this.transactionFiltersService.selectedSuggestion = value;
        }
    }

    private getBoundsFromGoogleMapsItem(geometry: any): google.maps.LatLngBounds {
        var bounds = new google.maps.LatLngBounds();
        var processPoints = function (item, callback, thisArg) {
            if (item instanceof google.maps.LatLng) {
                callback.call(thisArg, item);
            } else if (item instanceof google.maps.Data.Point) {
                callback.call(thisArg, item.get());
            } else {
                item.getArray().forEach(function (g) {
                    processPoints(g, callback, thisArg);
                });
            }
        };

        processPoints(geometry, bounds.extend, bounds);

        return bounds;
    }

    private getBoundsFromGoogleMapsPolygon(polygon: google.maps.Polygon): google.maps.LatLngBounds {
        //http://tutorialspots.com/google-maps-javascript-api-v3-method-polygon-getbounds-515.html

        var bounds = new google.maps.LatLngBounds();
        polygon.getPath().forEach(function (element, index) {
            bounds.extend(element)
        });
        return bounds
    }

    private zoomMapToLatLngBounds(bounds: google.maps.LatLngBounds) {
        this.mapReference.fitBounds(bounds);

        this.transactionFiltersService.MapZoom = this.mapReference.getZoom();
    }

    public mapDrawingEventHandler: any = {
        circlecomplete: (dm: google.maps.drawing.DrawingManager, name: string, scope: ng.IScope, objs: google.maps.Circle[]) => {
            this.$log.debug("Circle Complete");
            this.lastShapeDrawn = objs[0];
        },
        rectanglecomplete: (dm: google.maps.drawing.DrawingManager, name: string, scope: ng.IScope, objs: google.maps.Rectangle[]) => {
            this.$log.debug("Rectangle Complete");
            this.lastShapeDrawn = objs[0];
        },
        polygoncomplete: (dm: google.maps.drawing.DrawingManager, name: string, scope: ng.IScope, objs: google.maps.Polygon[]) => {
            this.$log.debug("Polygon Complete");
            this.lastShapeDrawn = objs[0];
        }
    };

    public pinMode: PinModeEnum = PinModeEnum.Transactions;
    public bubbleSearchResults: IBubbleTransactionItem[] = [];
    public pinSearchResults: IPinTransactionItem[] = [];
    // This (or equivalent) got taken out in an earlier commit, but it is needed by the PinResults (headers). We either
    // have special property for this or refactor PinResults to include a base property for the Currency/Measurements.
    public pinUserPreferences: UserPreferences.IUserPreferences;

    public mapMarkers: MapMarker<any>[] = [];

    public mapParcels: MapParcel[] = [];

    public static $inject: string[] = [
        "$log",
        "$scope",
        "$rootScope",
        "$http",
        "$q",
        "$timeout",
        "$interval",
        "$window",
        "$templateCache",
        "$compile",
        "$modal",
        "$state",
        "$stateParams",
        "uiGmapGoogleMapApi",
        "uiGmapIsReady",
        TransactionFiltersService.serviceName,
        TransactionSearchService.ServiceName,
        GeoShapeSearchService.ServiceName,
        Service.serviceName,
        UserPreferencesService.serviceName,
        ParcelsSearchService.ServiceName,
        ExcelDownloadService.ServiceName,
        EnvironmentConfiguration.ConstantName,
        TransactionFiltersRouteHelperService.serviceName
    ];

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                private $rootScope: ng.IRootScopeService,
                private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $timeout: ng.ITimeoutService,
                private $interval: ng.IIntervalService,
                private $window: ng.IWindowService,
                private $templateCache: ng.ITemplateCacheService,
                private $compile: ng.ICompileService,
                private $modal: ng.ui.bootstrap.IModalService,
                private $state: ng.ui.IStateService,
                private $stateParams: ng.ui.IStateParamsService,
                uiGmapGoogleMapApi: ng.IPromise<any>,
                private uiGmapIsReady: any,
                public transactionFiltersService: TransactionFiltersService,
                private transactionSearchService: TransactionSearchService,
                private geoShapeSearchService: GeoShapeSearchService,
                private authenticationService: AuthenticationService,
                private userPreferencesService: UserPreferencesService,
                private parcelsService: ParcelsSearchService,
                private excelDownloadService: ExcelDownloadService,
                private environment: EnvironmentConfiguration,
                public routingHelperService: TransactionFiltersRouteHelperService) {

        this.$log = this.$log.getInstance("Components.App.Properties.Transactions.TransactionsController");

        this.routingHelperService.parseParams(this.$stateParams);

        if (!(transactionFiltersService.MapCenter.latitude &&
            transactionFiltersService.MapCenter.longitude &&
            transactionFiltersService.MapZoom)) {

            transactionFiltersService.MapCenter.longitude = -73;
            transactionFiltersService.MapCenter.latitude = 45;
            transactionFiltersService.MapZoom = 5;
        }

        var googleMapsReferenceConfigured = false;
        var handleTransactionFiltersChanged = (request: PropertySearch.Requests.TransactionRequest) => {
            if (!googleMapsReferenceConfigured) {
                this.$log.warn("Awaiting GoogleMapsReference Configuration");
                return;
            }
            if (this.autoPanFlag) {
                this.$log.debug("Ignoring map bounds change because of info window autopan");
                this.autoPanFlag = false;
                return;
            }

            this.$log.debug("Transaction Filters Changed");

            //when view mode is fulltable, you want to run the search from the previous map that was on screen. since the map bounds of a hidden map cause an error
            if (this.viewMode === ViewModeEnum.FullTable) {
                request.MapBounds = this.previousMapBounds;
            }

            this.transactionSearchService.searchTransactionsDebounced(request);
        };

        $scope.$on(TransactionFiltersService.transactionFiltersChangedEvent, (angularEvent: ng.IAngularEvent, request: PropertySearch.Requests.Base) => {
            handleTransactionFiltersChanged(request);
        });

        $scope.$on(TransactionFiltersService.selectedSuggestionGeoShapeChangedEvent, (angularEvent: ng.IAngularEvent, geoShape: GeoJSON.GeoJsonObject) => {

        });

        $scope.$on(TransactionSearchService.transactionSearchExecutingEvent, (angularEvent: ng.IAngularEvent,
                                                                              request: PropertySearch.Requests.TransactionRequest)=> {
            this.$log.debug("Transaction Search Executing");
            this.updateStateArguments();
        });

        $scope.$on(TransactionSearchService.transactionSearchExecutedEvent, (angularEvent: ng.IAngularEvent,
                                                                             request: PropertySearch.Requests.TransactionRequest,
                                                                             response: PropertySearch.Responses.ITransactionResponse)=> {
            this.$log.debug("Transaction Search Executed", request, response);
            this.processTransactionSearchResponse(request, response);
        });

        $rootScope.$on(GeographyFilterController.shapeRetrievedEvent, (angularEvent: ng.IAngularEvent, savedShape: ISavedShape)=> {
            let result: google.maps.Circle | google.maps.Rectangle | google.maps.Polygon;
            let bounds: google.maps.LatLngBounds;

            if (savedShape instanceof SavedCircle) {
                let circle = (<SavedCircle>savedShape).getCircle();
                circle.setOptions(this.mapDrawingManagerOptions.circleOptions);
                bounds = circle.getBounds();

                result = circle;
            }
            else if (savedShape instanceof SavedRectangle) {
                let rectangle = (<SavedRectangle>savedShape).getRectangle();
                rectangle.setOptions(this.mapDrawingManagerOptions.rectangleOptions);
                bounds = rectangle.getBounds();

                result = rectangle;
            }
            else if (savedShape instanceof SavedPolygon) {
                let polygon = (<SavedPolygon>savedShape).getPolygon();
                polygon.setOptions(this.mapDrawingManagerOptions.polygonOptions);
                bounds = this.getBoundsFromGoogleMapsPolygon(polygon);

                result = polygon;
            }
            else {
                throw "Unknown shape type"
            }

            result.setMap(this.mapReference);
            this.zoomMapToLatLngBounds(bounds);
            this.lastShapeDrawn = result;
        });

        uiGmapGoogleMapApi.then((result: any) => {

            this.mapDrawingManagerOptions = {
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                        google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.RECTANGLE
                    ]
                },
                rectangleOptions: this.polyShapeOptions,
                circleOptions: this.polyShapeOptions,
                polygonOptions: this.polyShapeOptions
            };
        }, (result: any) => {
            this.$log.error("Could not load GoogleMaps Api");
        });

        this.$q.all([uiGmapGoogleMapApi, this.uiGmapIsReady.promise(1)]).then(
            (allResults: any[]) => {
                var googleMapInstancesWrapper = allResults[1];

                var options = {
                    minZoom: 1,
                    maxZoom: 18,
                    panControl: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false,
                    styles: [{"featureType": "poi", "stylers": [{"visibility": "off"}]}, {
                        "featureType": "landscape.natural",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{"color": "#ffffff"}, {"visibility": "simplified"}]
                    }]
                };

                googleMapInstancesWrapper[0].map.setOptions(options);

                this.mapReference = googleMapInstancesWrapper[0].map;
                this.mapReference.data.setStyle(this.geoJsonShapeOptions);

                google.maps.event.trigger(this.mapReference, "resize");

                if (transactionFiltersService.lastShapeDrawn != null) {
                    if (this.transactionFiltersService.lastShapeDrawn instanceof google.maps.Circle) {
                        let circle = <google.maps.Circle>this.transactionFiltersService.lastShapeDrawn;
                        circle.setMap(this.mapReference);
                    } else if (this.transactionFiltersService.lastShapeDrawn instanceof google.maps.Rectangle) {
                        let rectangle = <google.maps.Rectangle>this.transactionFiltersService.lastShapeDrawn;
                        rectangle.setMap(this.mapReference);
                    } else if (this.transactionFiltersService.lastShapeDrawn instanceof google.maps.Polygon) {
                        let polygon = <google.maps.Polygon>this.transactionFiltersService.lastShapeDrawn;
                        polygon.setMap(this.mapReference);
                    }
                }

                if (this.transactionFiltersService.selectedSuggestionMapFeature != null) {
                    this.mapReference.data.add(this.transactionFiltersService.selectedSuggestionMapFeature);
                }

                googleMapsReferenceConfigured = true;

                this.transactionFiltersService.getTransactionSearchServiceRequest()
                    .then(
                        (transactionSearchServiceRequest: NodeUtils.PropertySearch.Requests.TransactionRequest)=> {
                            handleTransactionFiltersChanged(transactionSearchServiceRequest);
                        });

            }, (result: any) => {
                this.$log.error("Could not load GoogleMaps Api and/or GoogleMaps Reference", result);
            });

        this.$log.debug("Constructed", this);
    }

    private updateStateArguments() {
        const transactionFiltersRouteOptions = new TransactionFiltersRouteOptions();
        transactionFiltersRouteOptions.ignoreGeoShape = true;
        transactionFiltersRouteOptions.includeBounds = false;

        this.$state.transitionTo(RouteConstants.propertiesTransactonsStateName, this.routingHelperService.getParams(transactionFiltersRouteOptions), {
            location: true,
            inherit: true,
            notify: false,
            reload: false,
        });
    }

    public get viewMode(): ViewModeEnum {
        return this.transactionFiltersService.viewMode;
    }

    public set viewMode(value: ViewModeEnum) {
        this.transactionFiltersService.viewMode = value;
        this.updateStateArguments();
    }

    public get mapCenter(): AngularGoogleMaps.IPoint {
        return this.transactionFiltersService.MapCenter;
    }

    public get mapZoom(): number {
        return this.transactionFiltersService.MapZoom;
    }

    public get mapBounds(): AngularGoogleMaps.IBounds {
        return this.transactionFiltersService.mapBounds;
    }

    public get isViewModeSplit(): boolean {
        return this.viewMode === ViewModeEnum.Split;
    }

    public get isViewModeFullMap(): boolean {
        return this.viewMode === ViewModeEnum.FullMap;
    }

    public get isViewModeFullTable(): boolean {
        return this.viewMode === ViewModeEnum.FullTable;
    }

    private setViewMode(viewMode: string) {
        this.viewMode = ViewModeEnum[viewMode];
        if (this.viewMode !== ViewModeEnum.FullTable) {
            //todo: refactor this interval waiting. purpose is to wait to call map resize until the map has indeed moved (from switching to full map or split view)
            this.$interval(() => {
                google.maps.event.trigger(this.mapReference, "resize");
                this.previousMapBounds = this.transactionFiltersService.mapBounds;
            }, 250, 1);
        }
    }

    public get pinModeString(): string {
        return PinModeEnum[this.pinMode];
    }

    public set pinModeString(value: string) {
        this.pinMode = PinModeEnum[value];
        this.mapMarkers.forEach((marker) => {
            marker.mapMarker.setMap(null);
        });
        this.mapMarkers = [];
        this.BuildTransactionPins();
    }

    public get isMapZoomLevelCountry(): boolean {
        return this.transactionFiltersService.MapZoomLevel === Map.Zoom.Country;
    }

    public get isMapZoomLevelMarket(): boolean {
        return this.transactionFiltersService.MapZoomLevel === Map.Zoom.Market;
    }

    public get isMapZoomLevelPin(): boolean {
        return this.transactionFiltersService.MapZoomLevel === Map.Zoom.Pin;
    }

    public selectedProperty: any[] = null;

    /**
     * Used in the PinTransactionTable for setting the Current Property Details View.
     * @param record - from the Transaction Results
     */
    public setSelectedProperty(record: any) {
        this.selectedProperty = [record];

        // Angular google maps does not support street view.
        // Either make a directive or use something like https://github.com/allenhwkim/angularjs-google-maps
        let center = {
            lat: record.Latitude,
            lng: record.Longitude
        };
        let element = angular.element(document.querySelector('#previewStreetView'));
        new google.maps.StreetViewPanorama(
            element[0], {
                position: center,
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                linksControl: false,
                panControl: false,
                addressControl: false,
                zoomControl: false
            });
    }

    public downloadExcel() {
        this.transactionFiltersService.getTransactionSearchServiceRequest().then(
            (transactionSearchRequest: PropertySearch.Requests.TransactionRequest) => {
                this.excelDownloadService.downloadExcel(transactionSearchRequest);
            });
    }

    public processTransactionSearchResponse(request: PropertySearch.Requests.TransactionRequest, response: PropertySearch.Responses.ITransactionResponse) {
        var propertyTypeAggregations: any[] = lodash.get<any[]>(response, 'aggregations.propertytypes.buckets');

        this.transactionFiltersService.propertyTypeFilterAggregations = <{[key:string]: IPropertyTypeFilterAggregation}>
            lodash(propertyTypeAggregations).reduce((aggregate: {[key:string]: IPropertyTypeFilterAggregation}, propertyTypeAggregation: any) => {
                var featureAggregations: {[key:string]: number} = lodash(lodash.get<any[]>(propertyTypeAggregation, 'features.buckets'))
                    .reduce<{[key:string]: number}>((aggregate: any, featureAggregation: any)=> {
                        aggregate[featureAggregation.key.toString()] = featureAggregation.doc_count;
                        return aggregate;
                    }, {});

                var propertySubTypeAggregations: {[key:string]: number} = lodash(lodash.get<any[]>(propertyTypeAggregation, 'propertysubtypes.buckets'))
                    .reduce<{[key:string]: number}>((aggregate: any, propertySubTypeAggregation: any)=> {
                        aggregate[propertySubTypeAggregation.key.toString()] = propertySubTypeAggregation.doc_count;
                        return aggregate;
                    }, {});

                var propertyTypeFilterAggregation: IPropertyTypeFilterAggregation = {
                    key: propertyTypeAggregation.key.toString(),
                    count: propertyTypeAggregation.doc_count,
                    subTypes: propertySubTypeAggregations,
                    features: featureAggregations
                };

                aggregate[propertyTypeFilterAggregation.key.toString()] = propertyTypeFilterAggregation;

                return aggregate;
            }, {});

        this.mapMarkers.forEach((marker) => {
            marker.mapMarker.setMap(null);
        });
        this.mapMarkers = [];

        // Bubble View
        if (lodash.has(response, "aggregations.group_by.buckets")) {
            let results = <any[]>lodash.get(response, "aggregations.group_by.buckets");
            this.pinSearchResults = [];
            this.mapReference.controls[google.maps.ControlPosition.RIGHT_TOP].clear();

            var bubbleSearchResultPromises = lodash.map(results, (result: any, index: number) => {

                return this.extractCurrency(result, true).then((currencyResult: Measurements.Currency.Currency) => {
                    return {
                        id: index + 1,
                        Longitude: result.point.bounds.bottom_right.lon,
                        Latitude: result.point.bounds.bottom_right.lat,
                        Name: result.key,
                        NumberOfTransactions: result.doc_count,
                        SumOfStatusPrice: result.price_sum.value,
                        CurrencySymbol: currencyResult.symbol
                    };

                });
            });

            this.$q.all<IBubbleTransactionItem>(bubbleSearchResultPromises).then(
                (bubbleSearchResults) => {
                    this.bubbleSearchResults = bubbleSearchResults;

                    this.mapMarkers = lodash.map(this.bubbleSearchResults, function (bubbleSearchResult: IBubbleTransactionItem) {
                        return MarkerIconFactory.ReturnBubbleMarker(bubbleSearchResult.Latitude, bubbleSearchResult.Longitude, bubbleSearchResult.Name, bubbleSearchResult.CurrencySymbol, bubbleSearchResult.SumOfStatusPrice);
                    });


                    this.mapMarkers.forEach((marker) => {
                        marker.mapMarker.setMap(this.mapReference);
                        var infowindow = new google.maps.InfoWindow({
                            content: marker.windowHTML
                        });
                        marker.mapMarker.addListener('click', () => {
                            this.autoPanFlag = true;
                            infowindow.open(this.mapReference, marker.mapMarker);
                            //prevent a new search from running for 500ms due to autopan.
                            this.$timeout(()=> {
                                this.autoPanFlag = false;

                            }, 500);
                        });
                    });
                },
                () => {
                    this.$log.error("Not all BubbleSearchResults resolved through promises");
                });

        }
        // Pins View
        else if (lodash.has(response, "hits.hits")) {
            let results = <any[]>lodash.get(response, "hits.hits");
            this.bubbleSearchResults = [];

            this.userPreferencesService.userPreferences.then((userPreferences: UserPreferences.IUserPreferences) => {
                    var pinSearchResultPromises = lodash.map(results, (result: any) => {

                        return this.extractCurrency(result, false).then((currencyResult: Measurements.Currency.Currency) => {
                            var unit = userPreferences.measurementUnit.convertSqft(result._source.units_dbl);
                            var pricePerUnit = userPreferences.measurementUnit.convertPriceSqft(result._source.statusPricePerUnitUS_amt);
                            var unitSymbol = userPreferences.measurementUnit.symbol;

                            return {
                                PropertyId: result._source.property_id,
                                DealId: result._source.deal_id,
                                PropertyKeyId: result._source.propertyKey_id,
                                Longitude: result._source.location_GeoShape.coordinates[0],
                                Latitude: result._source.location_GeoShape.coordinates[1],
                                TransactionType: result._source.transType_tx,
                                StatusDate: result._source.status_dt,
                                PropertyType: result._source.propertyType_tx,
                                PropertySubType: result._source.propertySubType_tx,
                                Market: result._source.market_tx,
                                Metro: result._source.metro_tx,
                                PropertyName: result._source.propertyName_tx,
                                Address: result._source.addressStd_tx,
                                City: result._source.city_tx,
                                StateProv: result._source.stateProv_tx,
                                Country: result._source.country_tx,
                                PostalCode: result._source.postalCode_tx,
                                Units: unit,
                                NumberBuildings: result._source.numberBuildings_nb,
                                NumberFloors: result._source.numberFloors_nb,
                                StatusPrice: result._source.statusPrice_amt,
                                StatusPricePerUnit: pricePerUnit,
                                StatusCapRate: result._source.statusCapRate_dbl,
                                StatusCapRateQualifier: result._source.statusCapRateQualifier_tx,
                                BuyerSellerBrokerString: result._source.completeBSBString_tx,
                                PropertyComments: result._source.propertyComments,
                                DealComments: result._source.dealComments,
                                YearBuilt: result._source.yearBuilt_nb,
                                QScore: result._source.qScoreLcl_pct * 100,
                                CurrencySymbol: currencyResult.symbol,
                                MeasurementSymbol: unitSymbol
                            };
                        });
                    });

                    this.$q.all<IPinTransactionItem>(pinSearchResultPromises).then(
                        (pinSearchResults) => {
                            this.pinSearchResults = pinSearchResults;
                            this.pinUserPreferences = userPreferences; // Needed for column headers.
                            this.BuildTransactionPins();
                        });

                    // TODO JB: move this outside of success so it can be called at the same time.
                    var parcelRequest = new PropertySearch.Requests.ParcelsSearchServiceRequest(request.MapBounds, request.MapZoomLevel);
                    if (this.transactionFiltersService.MapZoom >= 17) {
                        this.parcelsService.SearchParcelsImmediate(parcelRequest).then((parcels) => {
                            this.mapParcels = <MapParcel[]>parcels;
                        });
                    } else {
                        this.mapParcels = [];
                    }
                },
                () => {
                    this.$log.error("Not all PinSearchResults resolved through promises");
                }
            );
        }
        else {
            this.$log.error("Unknown TransactionSearchResponse Format");
        }
    }

    private BuildTransactionPins() {
        var pinMode = this.pinMode;
        if (pinMode === PinModeEnum.Transactions) {
            var groupedPins = lodash.groupBy(this.pinSearchResults, (pin) => {
                return pin.PropertyKeyId;
            });
            angular.forEach(groupedPins, (group: IPinTransactionItem[]) => {
                var transactionRows: ITransactionPinRow[] = [];
                group.sort((a, b)=> {
                    if (b.StatusDate < a.StatusDate)
                        return -1;
                    else if (b.StatusDate > a.StatusDate)
                        return 1;
                    else
                        return 0;

                });
                group.forEach((transaction)=> {
                    transactionRows.push({
                        propertyId: transaction.PropertyId,
                        dealId: transaction.DealId,
                        date: transaction.StatusDate,
                        amount: transaction.StatusPrice,
                        transactionType: transaction.TransactionType
                    });
                });
                this.mapMarkers.push(MarkerIconFactory.ReturnTransactionPin(group[0].Latitude, group[0].Longitude,
                    group[0].PropertyName, group[0].CurrencySymbol, transactionRows,
                    group[0].Address, group[0].City,
                    group[0].StateProv, group[0].Country,
                    group[0].PropertyType, group[0].PropertyKeyId));
            });
        } else if (pinMode === PinModeEnum.QScore) {
            this.mapMarkers = lodash.map(this.pinSearchResults, function (pinSearchResult: IPinTransactionItem) {
                return MarkerIconFactory.ReturnQScorePin(pinSearchResult.Latitude, pinSearchResult.Longitude,
                    pinSearchResult.PropertyName, pinSearchResult.CurrencySymbol,
                    pinSearchResult.QScore, pinSearchResult.Address,
                    pinSearchResult.City, pinSearchResult.StateProv,
                    pinSearchResult.Country, pinSearchResult.PropertyType,
                    pinSearchResult.PropertyId, pinSearchResult.DealId,
                    pinSearchResult.PropertyKeyId, pinSearchResult.StatusDate,
                    pinSearchResult.TransactionType, pinSearchResult.StatusPrice);
            });
        }


        this.mapMarkers.forEach((marker) => {
            marker.mapMarker.setMap(this.mapReference);
            var compiledContent = this.$compile(marker.windowHTML)(this.$scope);
            var infoWindow = new google.maps.InfoWindow({
                content: compiledContent[0]
            });
            marker.mapMarker.addListener('click', () => {
                this.autoPanFlag = true;
                infoWindow.open(this.mapReference, marker.mapMarker);
                //disable auto pan for 500ms to prevent a new search from running.
                this.$timeout(()=> {
                    this.autoPanFlag = false;

                }, 500);
            });
        });
        this.mapReference.controls[google.maps.ControlPosition.RIGHT_TOP].clear();
        if (pinMode === PinModeEnum.QScore) {
            var divLegend: HTMLElement = document.createElement("DIV");
            divLegend.innerHTML = this.$templateCache.get<string>(Constants.qScoreLegendTemplateName);
            divLegend.title = "Q Score Legend";
            this.mapReference.controls[google.maps.ControlPosition.RIGHT_TOP].push(divLegend);
        }
    }

    private extractCurrency(result, isBubble: boolean): ng.IPromise<Measurements.Currency.Currency> {
        // Extracts the currency from the result if local, otherwise it uses the currency specified from the user
        // preferences to used in conjunction with the updated prices.

        return this.userPreferencesService.userPreferences.then(
            (userPreferences: UserPreferences.IUserPreferences) => {
                if (userPreferences.isLocalCurrency()) {
                    var code = isBubble ? lodash.get(result, "currency_code.buckets[0].key") : result._source.localCurrecyCode_tx;
                    var currency = UtilsConstants.Currency.Dictionary.findByName(code);
                    if (!currency) {
                        this.$log.warn("No currency found! Using default:", currency.name);
                        currency = userPreferences.currency;
                    }
                    return currency;
                } else {
                    return userPreferences.currency;
                }
            });
    }

    public ClearLastShapeDrawn() {
        this.lastShapeDrawn = null;
    }

    //http://stackoverflow.com/questions/27803691/how-to-use-angular-ui-bootstrap-modals-in-typescript
    public OpenSaveShapeModal(): void {
        var options: ng.ui.bootstrap.IModalSettings = {
            template: this.$templateCache.get<string>(Constants.saveShapeModalTemplateName),
            controller: SaveShapeModalController.controllerName,
            controllerAs: SaveShapeModalController.controllerAs,
            resolve: {
                shape: () => {
                    return this.lastShapeDrawn;
                }
            },
            size: "sm"
        };

        this.$modal.open(options).result.then(()=> {

        });
    }
}

export = TransactionsController;
