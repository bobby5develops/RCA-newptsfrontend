/**
 * Created by mgilligan on 9/8/2015.
 */
/// <reference path="../../../tsd.d.ts" />

// ReSharper disable once WrongExpressionStatement
"use strict";

import lodash = require("lodash");
import {leadership} from "./biosLookup";

class LeadershipController {
    public static controllerName = "LeadershipController";
    public static controllerAsName = "leadershipCtrl";


    public static $inject = ["$log"];

    constructor(private $log: ng.ILogService) {

        this.$log = this.$log.getInstance("components.Content.LeadershipController");
        this.$log.debug("Constructed", this);
    }

    public get leaders(): any[] {
        return leadership;
    }
}

export = LeadershipController;
