/// <reference path="../../../tsd.d.ts" />

'use strict';

import Constants = require("../Constants");
import CompanyFiltersController from './CompanyFiltersController';

var CompanyFiltersDirectiveName = "companyFilters";

var CompanyFiltersDirective = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
        },
        controller: CompanyFiltersController.controllerName,
        controllerAs: CompanyFiltersController.controllerAs,
        template: $templateCache.get(Constants.CompanyFiltersTemplateName)
    };
};

CompanyFiltersDirective.$inject = ["$compile", "$templateCache"];

export {CompanyFiltersDirective, CompanyFiltersDirectiveName}