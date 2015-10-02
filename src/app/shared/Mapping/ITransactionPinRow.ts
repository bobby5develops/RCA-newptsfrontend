"use strict";


interface ITransactionPinRow {
    propertyId: number;
    dealId: number;
    date: Date;
    amount: number;
    transactionType: string;
}

export = ITransactionPinRow;