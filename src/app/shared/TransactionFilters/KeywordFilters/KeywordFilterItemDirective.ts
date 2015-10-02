/// <reference path="../../../tsd.d.ts" />

'use strict';

import * as Constants from "../Constants"
import KeywordFilterItemController from "./KeywordFilterItemController"
import {IKeywordFilterItemScope} from "./IKeywordFilterItemScope";

var KeywordFilterItemDirectiveName = "keywordFilterItem";

var KeywordFilterItemDirective = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
    "use strict";

    var uniqueId = 1;

    return {
        restrict: 'E',
        scope: {
            keyword: "="
        },
        link: function (scope: IKeywordFilterItemScope, elem: ng.IAugmentedJQuery, attributes: ng.IAttributes) {
            scope.uniqueId = "keywordItem_" + uniqueId++;
        },
        controller: KeywordFilterItemController.controllerName,
        controllerAs: KeywordFilterItemController.controllerAs,
        template: $templateCache.get(Constants.KeywordFiltersItemTemplateName)
    };
};

KeywordFilterItemDirective.$inject = ["$compile", "$templateCache"];

export {KeywordFilterItemDirective, KeywordFilterItemDirectiveName}