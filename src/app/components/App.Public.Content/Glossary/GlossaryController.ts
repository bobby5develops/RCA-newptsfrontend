/**
 * Created by mgilligan on 9/8/2015.
 */

/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");
import {glossaryIndex} from "./GlossaryLookup";

// ReSharper disable once WrongExpressionStatement
"use strict";

class GlossaryController {
    public static controllerName = "GlossaryController";
    public static controllerAsName = "glossaryCtrl";

    public static $inject = ["$log"];

    constructor(private $log: ng.ILogService) {
        this.$log = this.$log.getInstance("Components.App.Public.Content.GlossaryController");
        this.$log.debug("Constructed", this);
    }

    public get glossaryIndex(): {[glossaryIndexItem: string]: any[]} {
        return glossaryIndex;
    }
}


export = GlossaryController;
