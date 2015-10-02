/// <reference path="../../tsd.d.ts" />

'use strict';
import Constants = require("./Constants");
import UserPreferencesController = require('./UserPreferencesController');
export var DirectiveName = "userPreferences";

export var Directive = function ($compile: ng.ICompileService,
                                 $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            preferences: "=",
            style: "@",
            inputClass: "@"
        },
        replace: true,
        controller: UserPreferencesController,
        controllerAs: UserPreferencesController.ControllerAs,
        template: $templateCache.get(Constants.UserPreferencesTemplateName)
    };
};

Directive.$inject = ["$compile", "$templateCache"];
