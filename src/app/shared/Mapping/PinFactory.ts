/// <reference path="../../tsd.d.ts" />

"use strict";

import MarkerIcon = require("./MarkerIcon");
import ITransactionPinParameters = require("./ITransactionPinParameters");
import ITransactionPinRow = require("./ITransactionPinRow");
import IBubbleMarkerParams = require("./IBubbleMarkerParams");
import IQScorePinParameters = require("./IQScorePinParameters");
import MapMarker = require("./MapMarker");
import Constants = require("./Constants");

//todo: Need to add directive for info windows probably, to bind callback function for clicking prop detail

class PinFactory {
    public static ReturnTransactionPin(latitude: number,
                                       longitude: number,
                                       title: string,
                                       currencySymbol: string,
                                       transactions: ITransactionPinRow[],
                                       addressStd: string,
                                       city: string,
                                       stateProv: string,
                                       country: string,
                                       propertyType: string,
                                       propertyKeyId: number): MapMarker<ITransactionPinParameters> {
        var icon: MarkerIcon = null;
        switch (propertyType) {
            case "Apartment":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/apartment.png", 23, 28);
                break;
            case "Dev Site":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/dev.png", 23, 28);
                break;
            case "Industrial":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/industrial.png", 23, 28);
                break;
            case "Hotel":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/hotel.png", 23, 28);
                break;
            case "Retail":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/retail.png", 23, 28);
                break;
            case "Office":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/office.png", 23, 28);
                break;
            case "Other":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/other.png", 23, 28);
                break;
            case "Seniors Housing & Care":
                icon = new MarkerIcon("/assets/images/mobile_icons_color/shc.png", 23, 28);
                break;
        }

        var blurbString: string = (title === addressStd ? '' : addressStd + '<br />') + city + ', ' + stateProv + (country != 'US' ? ' ' + country : ' ');

        var params: ITransactionPinParameters = {
            blurb: blurbString,
            propertyKeyId: propertyKeyId,
            transactions: transactions,
            currencySymbol: currencySymbol
        };
        var result = `<div>` +
            `<label>${title}</label>` +
            `<div>${params.blurb}<br/>` +
            `<table class="table table-striped" cellpadding="10"><tbody>`;
        params.transactions.forEach((trans)=>{
            var date = moment(trans.date.toString(), "YYYY-MM-DD").format('MM/DD/YY');
            result += `<tr><td><a ng-click="transactionsCtrl.SetSelectedProperty(${trans.propertyId}, ${trans.dealId}, ${params.propertyKeyId})">${date}</a></td><td>${trans.transactionType}</td><td>${params.currencySymbol.trim()}${numeral(trans.amount).format('0,0')}</td></tr>`;
        });
        result +=  `</tbody></table></div>`;

        return new MapMarker<ITransactionPinParameters>(latitude, longitude, icon, result);

    }

    public static ReturnQScorePin(latitude: number,
                                  longitude: number,
                                  title: string,
                                  currencySymbol: string,
                                  qScore: number,
                                  addressStd: string,
                                  city: string,
                                  stateProv: string,
                                  country: string,
                                  propertyType: string,
                                  propertyId: number,
                                  dealId: number,
                                  propertyKeyId: number,
                                  date: Date,
                                  transType: string,
                                  amount: number) {
        var icon: MarkerIcon = null;
        /*
         null: grey
         0-20: blue
         21-40: green
         41-60: yellow
         61-80: orange
         81-100: red
         */
        if (!qScore) {
            icon = new MarkerIcon("/assets/images/mobile_icons_color/greyq.png", 23, 28);
        } else if(0 <= qScore && qScore < 21){
            icon = new MarkerIcon("/assets/images/mobile_icons_color/blueq.png", 23, 28);
        } else if(21 <= qScore && qScore < 41){
            icon = new MarkerIcon("/assets/images/mobile_icons_color/greenq.png", 23, 28);
        } else if(41 <= qScore && qScore < 61){
            icon = new MarkerIcon("/assets/images/mobile_icons_color/yellowq.png", 23, 28);
        } else if(61 <= qScore && qScore < 81){
            icon = new MarkerIcon("/assets/images/mobile_icons_color/orangeq.png", 23, 28);
        } else if(81 <= qScore){
            icon = new MarkerIcon("/assets/images/mobile_icons_color/redq.png", 23, 28);
        } else {
            icon = new MarkerIcon("/assets/images/mobile_icons_color/greyq.png", 23, 28);
        }

        var blurbString: string = (title === addressStd ? '' : addressStd + '<br />') + city + ', ' + stateProv + (country != 'US' ? ' ' + country : ' ') + '<br />';

        var params: IQScorePinParameters = {
            title: title,
            blurb: blurbString,
            propertyKeyId: propertyKeyId,
            dealId: dealId,
            propertyId: propertyId,
            qScore: qScore,
            currencySymbol: currencySymbol,
            date: date,
            transType: transType,
            amount: amount
        };
        //todo: figure out how to handle multiple transactions for one pin, which q score to show?
        var dateString = moment(params.date.toString(), "YYYY-MM-DD").format('MM/DD/YY');
        var result = `<div><a ng-click="transactionsCtrl.SetSelectedProperty(${params.propertyId}, ${params.dealId}, ${params.propertyKeyId})">Q Score: ${(params.qScore > 0) ? numeral(params.qScore).format('0.00') : "NA"}</a><br/>` +
            `<label>${title}</label>` +
            `<div>${params.blurb}` +
            `${dateString}  ${params.transType}  ${params.currencySymbol}${numeral(params.amount).format('0,0')}`+
            `</div>`;

        return new MapMarker<IQScorePinParameters>(latitude, longitude, icon, result);

    }



    public static ReturnBubbleMarker(latitude: number,
                                     longitude: number,
                                     title: string,
                                     currencySymbol: string,
                                     amount: number): MapMarker<IBubbleMarkerParams>  {
        var params: IBubbleMarkerParams = {
            title: title,
            amount: amount,
            currencySymbol: currencySymbol
        };
        var icon: MarkerIcon = null;
        
        // Under $10,000,000
        if (amount < 10000000) {
            icon = new MarkerIcon("/assets/images/bubbles/m1.png",10);
        } else {
            // Under $50,000,000
            if (amount < 50000000) {
                icon = new MarkerIcon("/assets/images/bubbles/m2.png",20);
            } else {
                // Under $100,000,000
                if (amount < 100000000) {
                    icon = new MarkerIcon("/assets/images/bubbles/m3.png",30);
                } else {
                    // Under $500,000,000
                    if (amount < 500000000) {
                        icon = new MarkerIcon("/assets/images/bubbles/m4.png",40);
                    } else {
                        // Under $1,000,000,000
                        if (amount < 1000000000) {
                            icon = new MarkerIcon("/assets/images/bubbles/m5.png",50);
                        } else {
                            // Under $2,500,000,000
                            if (amount < 2500000000) {
                                icon = new MarkerIcon("/assets/images/bubbles/m6.png",60);
                            } else {
                                // Under $5,000,000,000
                                if (amount < 5000000000) {
                                    icon = new MarkerIcon("/assets/images/bubbles/m7.png",70);
                                } else {
                                    // Under $10,000,000,000
                                    if (amount < 10000000000) {
                                        icon = new MarkerIcon("/assets/images/bubbles/m8.png",80);
                                    } else
                                    // Under $25,000,000,000
                                    if (amount < 25000000000) {
                                        icon = new MarkerIcon("/assets/images/bubbles/m9.png",90);
                                    } else {
                                        // Under $50,000,000,000
                                        if (amount < 50000000000) {
                                            icon = new MarkerIcon("/assets/images/bubbles/m10.png",100);
                                        } else
                                        // Under $100,000,000,000
                                        if (amount < 100000000000) {
                                            icon = new MarkerIcon("/assets/images/bubbles/m11.png",120);
                                        } else {
                                            // Under $250,000,000,000
                                            if (amount < 250000000000) {
                                                icon = new MarkerIcon("/assets/images/bubbles/m12.png",150);
                                            } else
                                            // Under $500,000,000,000
                                            if (amount < 500000000000) {
                                                icon = new MarkerIcon("/assets/images/bubbles/m13.png",200);
                                            } else {
                                                icon = new MarkerIcon("/assets/images/bubbles/m14.png",250);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var result = `<div>` +
            `<a>${params.title}</a><br/>` +
            `${params.currencySymbol}${numeral(params.amount).format('0,0')}`+
            `</div>`;

        return new MapMarker<IBubbleMarkerParams>(latitude, longitude, icon, result);
    }

}

export = PinFactory;