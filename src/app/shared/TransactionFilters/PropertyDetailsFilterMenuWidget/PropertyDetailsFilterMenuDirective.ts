/// <reference path="../../../tsd.d.ts" />

'use strict';

import Constants = require("../Constants");
import PropertyDetailsFilterMenuController = require('./PropertyDetailsFilterMenuController');

export var directiveName = "propDetailMenu";

export var directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            PropertyDetailsFilter: "=propFilters"
        },
        controller: PropertyDetailsFilterMenuController,
        controllerAs: PropertyDetailsFilterMenuController.ControllerAs,
        template: $templateCache.get(Constants.PropertyDetailsFilterMenuTemplateName)
    };
};

directive.$inject = ["$compile", "$templateCache"];

