/// <reference path="../../../tsd.d.ts" />

import * as NodeUtils from "cd-node-utils";

import Constants = require("../Constants");

import KeywordFiltersController from "./KeywordFiltersController";

'use strict';

var KeywordFiltersDirectiveName = "keywordFilters";

var KeywordFiltersDirective = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    return {
        restrict: 'E',
        scope: {
        },
        controller: KeywordFiltersController.controllerName,
        controllerAs: KeywordFiltersController.controllerAs,
        template: $templateCache.get(Constants.KeywordFiltersTemplateName)
    };
};

KeywordFiltersDirective.$inject = ["$compile", "$templateCache"];


export {KeywordFiltersDirective, KeywordFiltersDirectiveName}