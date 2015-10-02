/// <reference path="../../../tsd.d.ts" />

'use strict';
import * as Constants from "../Constants";
import {CompanyFilterItemController} from "./CompanyFilterItemController";
import {ICompanyFilterItemScope} from "./ICompanyFilterItemScope";

export var directiveName = "companyFilterItem";

export var directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    var uniqueId = 1;

    return {
        restrict: "E",
        scope: {
            company: "="
        },
        link: function (scope: ICompanyFilterItemScope, elem: ng.IAugmentedJQuery, attributes: ng.IAttributes) {
            scope.uniqueId = "companyItem_" + uniqueId++;
        },
        controller: CompanyFilterItemController.controllerName,
        controllerAs: CompanyFilterItemController.controllerAs,
        template: $templateCache.get(Constants.CompanyFilterItemTemplateName)
    };
};

directive.$inject = ["$compile", "$templateCache"];