/**
 * Created by mgilligan on 9/10/2015.
 */
/**
 * Created by mgilligan on 9/8/2015.
 */

/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");
import {leadership} from "./biosLookup";

// ReSharper disable once WrongExpressionStatement
"use strict";

class LeadershipItemController {
    public static controllerName = "LeadershipItemController";
    public static controllerAsName = "leadershipItemCtrl";

    public static $inject = ["$log", "$stateParams", "$state"];

    private LeadershipItem: any = null;

    constructor(private $log: ng.ILogService, private $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
        this.$log = this.$log.getInstance("Components.App.Public.Content.LeadershipItemController");

        var LeadershipItemKey = this.$stateParams["leadershipItem"];
        if(LeadershipItemKey === "" || LeadershipItemKey === null) {
            this.$log.error("Leadership Item Key is null/empty");

            $state.go('app.public.leadership');
        }

        this.LeadershipItem = lodash.filter(leadership, { id_tx: LeadershipItemKey})[0];
        if(!this.LeadershipItem) {
            this.$log.error("Leadership Item is not found");

            $state.go('app.public.leadership');
        }

        // this.$log.info("loaded Leadership item", this.LeadershipItem);

        this.$log.debug("Constructed", this);
    }
}

export = LeadershipItemController;
