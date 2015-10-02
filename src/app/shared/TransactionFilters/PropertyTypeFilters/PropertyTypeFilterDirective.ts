/// <reference path="../../../tsd.d.ts" />

import * as Constants from "../Constants";
import PropertyTypeFilterController from "./PropertyTypeFilterController";

export var directiveName = "propertyTypeFilter";

export var directive = function (): ng.IDirective {
    "use strict";

    return {
        restrict: "E",
        scope: {},
        templateUrl: Constants.PropertyTypeFilterTemplateName,
        controller: PropertyTypeFilterController.controllerName,
        controllerAs: PropertyTypeFilterController.controllerAs
    };
};
