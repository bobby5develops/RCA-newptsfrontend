/// <reference path="../../../tsd.d.ts" />

//http://davefancher.com/2014/10/24/recursive-angularjs-directives/

import Constants = require("../Constants");
import GeographyFilterItemController = require("./GeographyFilterItemController");
import IGeographyFilterItemScope = require("./IGeographyFilterItemScope");

export var directiveName = "geographyFilterItem";

export var directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    var template = $templateCache.get<string>(Constants.GeographyFilterItemTemplateName);
    var innerTemplate = $templateCache.get<string>(Constants.GeographyFilterItemChildrenTemplateName);

    return {
        restrict: "E",
        scope: {
            FilterItem: '=item'
        },
        controller: GeographyFilterItemController,
        controllerAs: GeographyFilterItemController.ControllerAs,
        template: template,
        link(scope: IGeographyFilterItemScope, element: JQuery, attrs: ng.IAttributes) {
            if (scope.FilterItem.Children.length > 0) {
                element.append(innerTemplate);
                $compile(element.contents()[1])(scope);
            }
        }
    };
};

directive.$inject = ["$compile", "$templateCache"];
