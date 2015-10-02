/**
 * Created by mgilligan on 9/10/2015.
 */
/**
 * Created by mgilligan on 9/8/2015.
 */

/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");
import {salespersons} from "./biosLookup";

// ReSharper disable once WrongExpressionStatement
"use strict";

class SalesItemController {
    public static controllerName = "SalesItemController";
    public static controllerAsName = "salesItemCtrl";

    public static $inject = ["$log", "$stateParams", "$state"];

    private SalesItem: any = null;

    constructor(private $log: ng.ILogService, private $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
        this.$log = this.$log.getInstance("Components.App.Public.Content.SalesItemController");

        var SalesItemKey = this.$stateParams["salesItem"];
        if(SalesItemKey === "" || SalesItemKey === null) {
            this.$log.error("SalesPerson Item Key is null/empty");

            $state.go('app.public.sales');
        }

        this.SalesItem = lodash.filter(salespersons, { id_tx: SalesItemKey})[0];
        if(!this.SalesItem) {
            this.$log.error("SalesPerson Item is not found");

            $state.go('app.public.sales');
        }

        // this.$log.info("loaded SalesPerson item", this.SalesItem);

        this.$log.debug("Constructed", this);
    }
}


export = SalesItemController;
