/// <reference path="../../tsd.d.ts" />

import Constants = require("./Constants");
import AutocompleteController = require('./AutocompleteController');
export var DirectiveName = "autocomplete";

export var Directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            suggestions : '=',
            keydownDelay : '=',
            onKeydown : '&',
            onSelect : '&',
            onEmpty : '&',
            searchText : '=ngModel',
            isDisabled : '=?',
            flipEnabled : '=?',
            scrollContainer : '@?',
            clearSuggestionsOnExit : '=',
        },
        controller: AutocompleteController,
        controllerAs: AutocompleteController.ControllerAs,
        template: $templateCache.get(Constants.AutocompleteTemplateName)
    };
};

Directive.$inject = ["$compile", "$templateCache"];
