"use strict";

interface IQScorePinParameters {
    title: string;
    blurb: string;
    propertyKeyId: number;
    dealId: number;
    propertyId: number;
    qScore: number;
    currencySymbol: string;
    date: Date;
    transType: string;
    amount: number;
}
export = IQScorePinParameters