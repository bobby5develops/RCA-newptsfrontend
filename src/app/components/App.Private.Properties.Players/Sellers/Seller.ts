/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");
import SellerData = require("./SellerData");
import LoDashStatic = _.LoDashStatic;

class Seller {
    constructor(public companyId: number,
                public companyName: string,
                public city: string,
                public stateProv: string,
                public country: string,
                public capitalGroup: string,
                public apartment: SellerData = new SellerData(),
                public devSite: SellerData = new SellerData(),
                public hotel: SellerData = new SellerData(),
                public industrial: SellerData = new SellerData(),
                public office: SellerData = new SellerData(),
                public retail: SellerData = new SellerData(),
                public seniors: SellerData = new SellerData(),
                public other: SellerData = new SellerData()){
    }
    public get cityStateCountryString(): string {
        return lodash
            .filter([this.city, this.stateProv, this.country],(item) => item != null)
            .join(", ");
    }
    public get totalNumberOfProperties(): number {
        var numberOfPropertiesArray = lodash
            .filter([this.apartment, this.devSite, this.hotel, this.industrial, this.office, this.retail, this.seniors, this.office], (item)=>item != null)
            .map((sellerData: SellerData)=>sellerData.numberOfProperties);

        return lodash.sum(numberOfPropertiesArray);
    }
}

export = Seller;