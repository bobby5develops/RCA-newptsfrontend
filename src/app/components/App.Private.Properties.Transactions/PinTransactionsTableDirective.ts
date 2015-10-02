/// <reference path="../../tsd.d.ts" />

import Constants = require("./Constants");

'use strict';
// These are not in the Const files because they're not public. However they can be moved if need be.
export const DirectiveName = "pinTransactionsTable";
var templateNamespace = Constants.moduleName + ".Templates.";
export const TemplateName = templateNamespace + "PinTransactionsTableTemplate";

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
        controller: PinTransactionsTableController,
        controllerAs: PinTransactionsTableController.ControllerAs,
        template: $templateCache.get(TemplateName)
    };
};

Directive.$inject = ["$compile", "$templateCache"];

/**
 * Internal to the Directive and is not exposed publicly.
 */
class PinTransactionsTableController {
    public static ControllerAs = "pinTableCtrl";

    public static $inject = [
        "$log",
        "$filter"
    ];
    private labels;

    constructor(private $log : ng.ILogService,
                private $filter: ng.IFilterService) {
        this.$log = this.$log.getInstance("Components.App.Properties.Transactions.PinTransactionsTableController");
        this.$log.debug("PinTransactionsTableController initialized");
        // We may be able to assume +s for these but for now we will have separate entries:
        this.labels = {
            bld : this.$filter('translate')('BUILDING_ABV'),
            blds : this.$filter('translate')('BUILDINGS_ABV'),
            flr : this.$filter('translate')('FLOOR_ABV'),
            flrs : this.$filter('translate')('FLOORS_ABV')
        }
    }

    /**
     * This adapts the old PTS BSB string for use in the new PTS. Eventually the source of this string should either
     * change to reference the new system or the App Layer does this transform.
     * @param oldValue
     * @returns {string}
     */
    public adaptBSBString(oldValue: string) : string {
        // Old site to new image path hack:
        var newValue = oldValue.replace(/\/images\//g, "/assets/images/bsb/").toLowerCase();
        // Old site adapter hack:
        // newValue = newValue.replace(/\/CompanyProfiles.aspx/ig, "//www.rcanalytics.com/CompanyProfiles.aspx");
        // CD-7435.  point to non-existent CompanyProfile screen
        newValue = newValue.replace(/\/CompanyProfiles.aspx/ig, "/#/CompanyProfile");
        return newValue;
    }

    /**
     * This adapts the old PTS BSB comments for use in the new PTS. Eventually the source of this string should either
     * change to reference the new system or the App Layer does this transform.
     * @param propertyComments
     * @param dealComments
     * @returns {string}
     */
    public adaptComments(propertyComments, dealComments) : string {
        var prop = propertyComments ? `<li>${propertyComments}</li>` : "";
        var deal = dealComments ? `<li>${dealComments}</li>` : "";
        return `<ul>${prop}${deal}</ul>`;
    }

    /**
     * Number of Building and Floors string is a little too complex to do it in the templates so this helper function
     * handles the pluralization and omitting instead.
     * @param numBuildings
     * @param numFloors
     * @returns {string}
     */
    public buildingsAndFloors(numBuildings, numFloors) : string {
        var buildings = this.pluralize(numBuildings, this.labels.bld, this.labels.blds);
        var divider = !!numBuildings && !!numFloors ?  "/" : "";
        var floors = this.pluralize(numFloors, this.labels.flr, this.labels.flrs);
        return `${buildings}${divider}${floors}`;
    }

    /**
     * JB - TODO Unit Test this
     * @param num - This is really a string in the case of Floors.
     * @param single - Single Resource Name
     * @param multiple - Plural Resource Name
     * @returns {any}
     */
    private pluralize(num: string, singular : string, plural : string) : string {
        // It's a string so let's deal with it (e.g., "3, 4, 5" floors):
        var count = _.parseInt(num); // Handle actual count if it's not a list.
        var length = _.size(num); // Handle string size if it's a list.
        var size = count > length ? count : length;
        if (!size || size < 1) {
            return "";
        } else {
            var label = size > 1 ? plural : singular;
            return num + " " + label;
        }
    }
}
