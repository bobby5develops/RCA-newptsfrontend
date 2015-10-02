/// <reference path="../../tsd.d.ts" />
'use strict';

import ITransactionPinRow = require("./ITransactionPinRow");

interface ITransactionPinParameters {
    blurb: string;
    propertyKeyId: number;
    transactions: ITransactionPinRow[];
    currencySymbol: string;
}

export = ITransactionPinParameters;