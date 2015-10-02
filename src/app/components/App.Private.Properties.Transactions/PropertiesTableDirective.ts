/// <reference path="../../tsd.d.ts" />

import Constants = require("./Constants");

'use strict';
// These are not in the Const files because they're not public. However they can be moved if need be.
export const DirectiveName = "propertiesTable";
var templateNamespace = Constants.moduleName + ".Templates.";
export const TemplateName = templateNamespace + "PropertiesTableTemplate";

/**
 * The Properties Table Directive (3 and later 1 line view) used in the "Holdings" view of the Properties/Transactions
 *
 * The Properties Table Directive although similar to the PinsTransactionsTable was created in a new directive to allow
 * for dissimilar functionality and view specifics. However if the two views are enough alike in the long run we can
 * combine them.
 * @param $compile
 * @param $templateCache
 * @returns object - Directive
 * @constructor
 */
export var Directive = function ($compile: ng.ICompileService,
                                 $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            full: "=",
            model: "=",
            currency: "=",
            measurement: "=",
            preview: "=",
            selected: "&"
        },
        bindToController: true, // Allows the model to be directly bound to this controller thus not needing watches.
        controller: PropertiesTableController,
        controllerAs: PropertiesTableController.ControllerAs,
        template: $templateCache.get(TemplateName)
    };
};

Directive.$inject = ["$compile", "$templateCache"];

/**
 * Internal to the Directive and is not exposed publicly.
 */
class PropertiesTableController {
    public static ControllerAs = "propTableCtrl";

    public static $inject = [
        "$log"
    ];

    constructor(private $log : ng.ILogService,
                private $filter: ng.IFilterService) {
        this.$log = this.$log.getInstance("Components.App.Properties.Transactions.PropertiesTableController");
        this.$log.debug("PropertiesTableController initialized");
    }
}
