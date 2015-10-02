/// <reference path="../../tsd.d.ts" />

import lodash = require("lodash");
import MarkerIconFactory = require("../../shared/Mapping/PinFactory");
import MapMarker = require("../../shared/Mapping/MapMarker");
import ITransactionPinRow = require("../../shared/Mapping/ITransactionPinRow");
import MarkerIcon = require("../../shared/Mapping/MarkerIcon");
import LollipopLineChartInterfaces = require("../../shared/LollipopLineChartWidget/ILollipopLineChartInterfaces")
import { IPropertyDetailRequest, IPropertyDetailResponse } from "./PropertyDetailModule"
import { IPropertyDetailScope } from "./IPropertyDetailScope"

//TODO: fix prop detail map markers


var parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S').parse;

class PropertyDetailController {
  public static ControllerAs = "propDetail";
  public static $inject = ["$log", "$http", "$scope", "uiGmapGoogleMapApi", "uiGmapIsReady"];

  private prop: any;
  private tenants: any;
  private currentOwner: any;
  private satMap: {
    center: {
      latitude: number;
      longitude: number;
    };
    zoom: number;
    options: {
      mapTypeId: string;
    }
  };
  private marker: google.maps.Marker;
  private transHistoryChartData:LollipopLineChartInterfaces.IData={};
  private transHistoryChartOptions:LollipopLineChartInterfaces.IOptions = {};
  private propertyPlayers : any;

  chartOnLineClick(propertyId, propertyKeyId, dealId) {
    this.newGetPropDetailResponse({
      propertyId: propertyId,
      dealId: dealId,
      propertyKeyId: propertyKeyId
    });
  }




  newGetPropDetailResponse(input: IPropertyDetailRequest) {

    this.$http.post('https://pts.rcanalytics.local/api/v1/propertyinfo/details', input)
      .success((data: any) => {
        data = data || {};
        this.prop = data.propertyDetail;
        //this.propertyHistory = data.propertyKeyTransactions;
        //this.marketHistory = data.propertyAggregatedStats;


          // map json to js objects for D3 consumption
          var marketData = data.propertyAggregatedStats.map((point) =>{
              return {
                  date : parseDate(point.fact_dt),
                  ppu : point.ppu
              };
          });

          var lollipops = data.propertyKeyTransactions.map((lollipop) =>{
            return {
              date : parseDate(lollipop.status_dt),
              type : lollipop.transType,
              price : lollipop.ppu
            };
          });

          // add year renovated
          if (this.prop.yearRenovated_nb){
            lollipops.push({
              date : new Date(this.prop.yearRenovated_nb, 0, 1),
              type : "Renovate",
              price : null
            })
          }


          angular.extend(this, {
            transHistoryChartOptions: {
              axes : {
                xLabel : 'Time',
                yLabel : 'Price Per Unit ($)'
              }
            },
            transHistoryChartData : {
              lollipops : lollipops,
              lines : [{
                  name : "Market",
                  data : marketData
              }]
            }
          });

        this.currentOwner = lodash.get(data, 'propertyPlayersByDeal[0]');
        this.tenants = lodash.get(data, 'propertyTenants');

          // group all buyers, sellers, buyer brokers, and seller brokers by their key
        var propertyPlayers = lodash.groupBy(lodash.get(data, 'propertyPlayersByDeal', []), 'dealRole_tx');

          // clean up and sort
            for (var key in propertyPlayers){

                var vals = propertyPlayers[key];
                if (Array.isArray(vals)){

                  // remove bsb without names
                  _.remove(vals, function(val){
                    return !val || !val.principal_tx;
                  });
                    propertyPlayers[key] = lodash.sortBy(vals, 'seq_nb');
                }
            }

       this.propertyPlayers = propertyPlayers;

      }).error((data, status)=> {
        console.log('error: ' + status);
      }).then(()=> {
        this.satMap = {
          center: {
            latitude: this.prop.lat_dbl,
            longitude: this.prop.lon_dbl
          },
          zoom: 18,
          options: {
            mapTypeId: 'satellite'
          }
        };


        //this.marker = [{
        //  latitude: this.prop.lat_dbl,
        //  longitude: this.prop.lon_dbl,
        //  title: this.prop.propertyName_tx,
        //  id: this.prop.deal_id,
        //  icon: this.determineImgFromPropertyType(this.prop.propertyType_tx),
        //  options: {title: this.prop.propertyType_tx},
        //  value: 0,
        //  currencySymbol: '',
        //  blurb: this.prop.addressStd_tx + '<br />' + this.prop.city_tx + ', ' + this.prop.stateProv_tx + (this.prop.country_tx != 'US' ? ' ' + this.prop.country_tx : '') + '<br />'
        //}];
      });

  }

   determineImgFromPropertyType(propertyTypeTx): google.maps.Icon {

     switch (propertyTypeTx) {
       case "Apartment":
         return new MarkerIcon("/assets/images/mobile_icons_color/apartment.png",23, 28);
         break;
       case "Dev Site":
         return new MarkerIcon("/assets/images/mobile_icons_color/dev.png",23, 28);
         break;
       case "Industrial":
         return new MarkerIcon("/assets/images/mobile_icons_color/industrial.png",23, 28);
         break;
       case "Hotel":
         return new MarkerIcon("/assets/images/mobile_icons_color/hotel.png",23, 28);
         break;
       case "Retail":
         return new MarkerIcon("/assets/images/mobile_icons_color/retail.png",23, 28);
         break;
       case "Office":
         return new MarkerIcon("/assets/images/mobile_icons_color/office.png",23, 28);
         break;
       case "Other":
         return new MarkerIcon("/assets/images/mobile_icons_color/other.png",23, 28);
         break;
       case "Seniors Housing & Care":
         return new MarkerIcon("/assets/images/mobile_icons_color/shc.png",23, 28);
         break;
     }
}

  getPropDetailResponse(propertyId: number): void {
    // var response : Common.IPropDetailResponse;
    this.$http.get('../../../../testdata/propdetail.stub.json').success((data: any)=> {
      var results: any = lodash.get(<IPropertyDetailResponse>data, 'hits.hits[0]._source');
      this.prop = results;
    }).error((data, status)=> {
      console.log('error: ' + status);
    }).then(()=> {
      this.satMap = {
        center: {
          latitude: this.prop.lat_dbl,
          longitude: this.prop.lon_dbl
        },
        zoom: 18,
        options: {
          mapTypeId: 'satellite'
        }
      };
      console.log(this.satMap);
      //this.marker = [{
      //  latitude: this.prop.lat_dbl,
      //  longitude: this.prop.lon_dbl,
      //  title: this.prop.propertyName_tx,
      //  id: this.prop.deal_id,
      //  icon: this.determineImgFromPropertyType(this.prop.propertyType_tx),
      //  options: {title: this.prop.propertyType_tx},
      //  value: this.prop.statusPriceUSD_amt,
      //  currencySymbol: '',
      //  blurb: this.prop.addressStd_tx + '<br />' + this.prop.city_tx + ', ' + this.prop.stateProv_tx + ' '  + (this.prop.country_tx != 'US' ? ' ' + this.prop.country_tx : '') + '<br />'
      //}];

    });
  }

  constructor(private $log: ng.ILogService, private $http: ng.IHttpService, $scope: IPropertyDetailScope) {
    this.$log = this.$log.getInstance("components.transactions.PropertyDetailController");


    $scope.$watch(() => {
        return $scope.propertyRequest;
      },
      () => {
        this.newGetPropDetailResponse($scope.propertyRequest);
      }, true);

    this.$log.debug("Constructed prop detail");
  }
}

export = PropertyDetailController;
