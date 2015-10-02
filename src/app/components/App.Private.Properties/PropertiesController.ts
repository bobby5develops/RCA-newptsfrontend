/// <reference path="../../tsd.d.ts" />

import lodash = require("lodash");
import Constants = require("./Constants");

import {TransactionFiltersService} from "../../shared/TransactionFilters/TransactionFiltersModule";

// ReSharper disable once WrongExpressionStatement
"use strict";

class PropertiesController {
    public static controllerName = "PropertiesController";
    public static controllerAs = "propertiesCtrl";

    public static $inject: string[] = [
        "$log",
        "$scope",
        TransactionFiltersService.serviceName
    ];

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                public transactionFiltersService: TransactionFiltersService) {
        this.$log = this.$log.getInstance("Components.App.Private.Properties.PropertiesController");

        this.$log.debug("Constructed", this);
    }

    public showDebugger: boolean = false;

    public hideDebugger(): void{
        this.showDebugger = false;
    }
}

export default PropertiesController;