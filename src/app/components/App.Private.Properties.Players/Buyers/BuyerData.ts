/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");

class BuyerData {
    constructor(public numberOfProperties: number = 0,
                public totalUnits: number = 0,
                public totalVolume: number = 0) {
    }
}

export = BuyerData;