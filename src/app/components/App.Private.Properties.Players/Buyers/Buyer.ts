/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");
import BuyerData = require("./BuyerData");

class Buyer {
    constructor(public companyId: number,
                public companyName: string,
                public city: string,
                public stateProv: string,
                public country: string,
                public capitalGroup: string,
                public apartment: BuyerData = new BuyerData(),
                public devSite: BuyerData = new BuyerData(),
                public hotel: BuyerData = new BuyerData(),
                public industrial: BuyerData = new BuyerData(),
                public office: BuyerData = new BuyerData(),
                public retail: BuyerData = new BuyerData(),
                public seniors: BuyerData = new BuyerData(),
                public other: BuyerData = new BuyerData()) {
    }

    public get multiFamily():BuyerData
    {
        let numberOfProperties = this.seniors.numberOfProperties + this.apartment.numberOfProperties;
        let numberOfUnits = this.seniors.totalUnits + this.apartment.totalUnits;
        let totalVolume = this.seniors.totalVolume + this.apartment.totalVolume;
        return new BuyerData(numberOfProperties, numberOfUnits, totalVolume);
    }

    public get cityStateCountryString(): string {
        return lodash
            .filter([this.city, this.stateProv, this.country], (item)=>item != null)
            .join(", ");
    }

    public get totalNumberOfProperties(): number {
        var numberOfPropertiesArray = lodash
            .filter([this.apartment, this.devSite, this.hotel, this.industrial, this.office, this.retail, this.seniors, this.office], (item)=>item != null)
            .map((buyerData: BuyerData)=>buyerData.numberOfProperties);

        return lodash.sum(numberOfPropertiesArray);
    }
}

export = Buyer;