/**
 * Created by mgilligan on 9/8/2015.
 */

/// <reference path="../../../tsd.d.ts" />

import lodash = require("lodash");
import {glossary} from "./GlossaryLookup";

// ReSharper disable once WrongExpressionStatement
"use strict";

class GlossaryItemController {
    public static controllerName = "GlossaryItemController";
    public static controllerAsName = "glossaryItemCtrl";

    public static $inject = ["$log", "$stateParams", "$state"];

    private glossaryItem: any = null;

    constructor(private $log: ng.ILogService, private $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
        this.$log = this.$log.getInstance("Components.App.Public.Content.GlossaryItemController");

        var glossaryItemKey = this.$stateParams["glossaryItem"];
        if(glossaryItemKey === "" || glossaryItemKey === null) {
            this.$log.error("Glossary Item Key is null/empty");

            $state.go('app.public.glossary');
        }

        this.glossaryItem = glossary[glossaryItemKey][0];
        if(!this.glossaryItem) {
            this.$log.error("Glossary Item is not found");

            $state.go('app.public.glossary');
        }

        this.$log.info("loaded glossary item", this.glossaryItem);

        this.$log.debug("Constructed", this);
    }
}


export = GlossaryItemController;
