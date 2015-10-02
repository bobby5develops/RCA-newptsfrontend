/// <reference path="../../tsd.d.ts" />

import * as angular from "angular"
import EnvironmentConfiguration = require("../../shared/Environment/EnvironmentConfiguration");
import LollipopLineChartInterfaces = require("../../shared/LollipopLineChartWidget/ILollipopLineChartInterfaces");
import MarkerIcon = require("../../shared/Mapping/MarkerIcon");
import { IPropertyDetailRequest, IPropertyDetailResponse } from "../../shared/PropertyDetail/PropertyDetailModule";
/**
 *
 */
export default class PropertyDetailController {

    public static controllerName = "PropertyDetailController";
    public static controllerAs = "propertyDetailCtrl";

    public static $inject = [
        "$log",
        "$filter",
        "$http",
        "$state",
        "uiGmapGoogleMapApi",
        "uiGmapIsReady",
        EnvironmentConfiguration.ConstantName
    ];

    public propertyDetail: any;
    public players: any;
    public financing: any;
    public history: any;
    public transHistoryChartData: LollipopLineChartInterfaces.IData = {};
    public transHistoryChartOptions: LollipopLineChartInterfaces.IOptions = {};

    public satelliteMap = {};
    public satelliteMarker = {};

    private dealRoles;
    private parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S').parse;

    constructor(private $log: ng.ILogService,
                private $filter: ng.IFilterService,
                private $http: ng.IHttpService,
                private $state: any,
                private uiGmapGoogleMapApi: ng.IPromise<any>,
                private uiGmapIsReady: any,
                private environment: EnvironmentConfiguration) {
        this.$log = this.$log.getInstance("Components.App.PropertyDetail.PropertyDetailController");
        this.$log.debug("Init Property Details Page with:", this.$state.params);

        // TODO Resource
        this.dealRoles = {
            B: {label: "Owner/Buyer", extended: true},
            BB: {label: "Buyer's Broker", extended: false},
            S: {label: "Seller", extended: true},
            SB: {label: "Seller's Broker", extended: false}
        };

        let requestData: IPropertyDetailRequest = {
            propertyId: this.$state.params.propertyId,
            dealId: this.$state.params.dealId,
            propertyKeyId: this.$state.params.propertyKeyId
        };

        if (this.isValid(requestData)) {
            this.getProperty(requestData).then((data: any) => {
                this.propertyDetail = <IPropertyDetailResponse> data.propertyDetail;
                this.financing = data.propertyLoans;
                this.players = data.propertyPlayersByDeal;
                this.history = data.propertyHistory;

                this.satelliteMap = {
                    center: {
                        latitude: this.propertyDetail.lat_dbl,
                        longitude: this.propertyDetail.lon_dbl
                    },
                    zoom: 18,
                    options: {
                        mapTypeId: 'satellite'
                    }
                };

                this.satelliteMarker = {
                    id: 1,
                    coords: {
                        latitude: this.propertyDetail.lat_dbl,
                        longitude: this.propertyDetail.lon_dbl
                    },
                    options: {
                        icon: this.resolveIconFromPropertyType(this.propertyDetail.propertyType_tx)
                    }
                };

                uiGmapIsReady.promise(1).then((gmap) => {
                let center = {
                    lat: this.propertyDetail.lat_dbl,
                    lng: this.propertyDetail.lon_dbl
                };
                let element = angular.element(document.querySelector('#panorama'));
                new google.maps.StreetViewPanorama(
                    element[0], {
                        position: center,
                        addressControlOptions: {
                            position: google.maps.ControlPosition.BOTTOM_CENTER
                        }
                    });
                });

                let marketData = data.propertyAggregatedStats.map((point) => {
                    return {
                        date: this.parseDate(point.fact_dt),
                        ppu: point.ppu
                    };
                });

                let lollipops = data.propertyKeyTransactions.map((lollipop) => {
                    return {
                        date: this.parseDate(lollipop.status_dt),
                        type: lollipop.transType,
                        price: lollipop.ppu
                    };
                });

                // add year renovated
                if (this.propertyDetail.yearRenovated_nb) {
                    lollipops.push({
                        date: new Date(this.propertyDetail.yearRenovated_nb, 0, 1),
                        type: "Renovate",
                        price: null
                    })
                }

                angular.extend(this, {
                    transHistoryChartOptions: {
                        axes: {
                            xLabel: 'Time',
                            yLabel: 'Price Per Unit ($)'
                        }
                    },
                    transHistoryChartData: {
                        lollipops: lollipops,
                        lines: [{
                            name: "Market",
                            data: marketData
                        }]
                    }
                });
            })
        } else {
            this.$log.error("Invalid URL Params for Property Details", requestData, this.$state.params);
        }
    }

    public formatAddress(address: string, city: string, stateProv: string, postal: string, country: string): string {
        let firstPart = `${!!address ? address : ""} ${!!city ? city : ""}`.trim();
        let secondPart = `${!!stateProv ? stateProv : ""} ${!!postal ? postal : ""}`.trim();
        let separator = !!firstPart && !!secondPart ? ", " : "";
        let countryString = !!country ? `(${country})` : "";
        return firstPart + separator + secondPart + countryString;
    }

    public resolveDealRole(dealRole: string): string {
        if (dealRole) {
            let role = this.dealRoles[dealRole];
            if (!role) {
                throw "Undefined Deal Role!";
            }
            return role;
        } else {
            throw "Empty Deal Role!";
        }
    }

    public adaptHistoryPlayer(value: string): string {
        return value.replace(/\/?images\//g, "/assets/images/bsb/");
    }

    private serviceUrl(): string {
        return this.environment.ServerAPIv1Url + "propertyinfo/details";
    }

    private getProperty(property): ng.IPromise<any> {
        return this.$http.post(this.serviceUrl(), property).then((response) => {
            return response.data;
        })
    }

    private isValid(requestData: IPropertyDetailRequest): boolean {
        return !!requestData.dealId && !!requestData.propertyId && !!requestData.propertyKeyId;
    }

    private resolveIconFromPropertyType(propertyTypeTx): string {

        switch (propertyTypeTx) {
            case "Apartment":
                return "/assets/images/mobile_icons_color/apartment.png";
                break;
            case "Dev Site":
                return "/assets/images/mobile_icons_color/dev.png";
                break;
            case "Industrial":
                return "/assets/images/mobile_icons_color/industrial.png";
                break;
            case "Hotel":
                return "/assets/images/mobile_icons_color/hotel.png";
                break;
            case "Retail":
                return "/assets/images/mobile_icons_color/retail.png";
                break;
            case "Office":
                return "/assets/images/mobile_icons_color/office.png";
                break;
            case "Other":
                return "/assets/images/mobile_icons_color/other.png";
                break;
            case "Seniors Housing & Care":
                return "/assets/images/mobile_icons_color/shc.png";
                break;
        }
    }
}