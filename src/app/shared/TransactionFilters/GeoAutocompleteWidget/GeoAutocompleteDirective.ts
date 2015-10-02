/// <reference path="../../../tsd.d.ts" />

import * as Constants from "../Constants";
import {GeoAutocompleteController} from './GeoAutocompleteController';
export var directiveName = "geoAuto";

export var directive = function ($templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            selectedSuggestion: '='
        },
        controller: GeoAutocompleteController.controllerName,
        controllerAs: GeoAutocompleteController.controllerAs,
        template: $templateCache.get(Constants.GeoAutocompleteTemplateName)
    };
};

directive.$inject = ["$templateCache"];
