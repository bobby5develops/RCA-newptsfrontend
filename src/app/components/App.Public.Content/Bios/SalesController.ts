/**
 * Created by mgilligan on 9/8/2015.
 */
/// <reference path="../../../tsd.d.ts" />

// ReSharper disable once WrongExpressionStatement
"use strict";

import lodash = require("lodash");
import {salespersons} from "./biosLookup";

class SalesController {
    public static controllerName = "SalesController";
    public static controllerAsName = "salesCtrl";


    public static $inject = ["$log"];

    constructor(private $log: ng.ILogService) {

        this.$log = this.$log.getInstance("components.Content.SalesController");
        this.$log.debug("Constructed", this);
    }

    public get salespersons(): any[] {
        return salespersons;
    }
}

export = SalesController;