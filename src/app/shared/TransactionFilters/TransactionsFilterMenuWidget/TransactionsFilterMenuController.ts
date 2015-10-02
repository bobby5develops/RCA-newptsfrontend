/// <reference path="../../../tsd.d.ts" />

import ITransactionsFilterMenuScope = require("./ITransactionsFilterMenuScope");
import NodeUtils                    = require('cd-node-utils');

"use strict";

class TransactionsFilterMenuController {
    public static ControllerName = "TransactionsFilterMenuController";
    public static ControllerAs = "transFilterMenuCtrl";

    private TransactionSearchFilters: NodeUtils.PropertySearch.Filters.TransactionCharacteristics;

    public static ValueChangedEvent = "TransactionsFilters.ValueChanged";

    public static $inject = ["$log", "$scope"];

    constructor(private $log: ng.ILogService, private $scope: ITransactionsFilterMenuScope) {
        this.TransactionSearchFilters = $scope.TransactionSearchFilters;

        $scope.$watch(()=> {
            return this.TransactionSearchFilters;
        }, ()=> {
            this.$scope.$emit(TransactionsFilterMenuController.ValueChangedEvent);
        }, true);
    }

    public SetFilterItemValue(value: boolean, fieldName: string) {
        this.TransactionSearchFilters[fieldName] = value;
    }
}

export = TransactionsFilterMenuController;
