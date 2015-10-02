/// <reference path="../../../tsd.d.ts" />

'use strict';
import Constants = require("../Constants");
import TransactionsFilterMenuController = require('./TransactionsFilterMenuController');
export var directiveName = "transFilterMenu";

export var directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
  "use strict";

  return {
    restrict: 'E',
    scope: {
      TransactionSearchFilters: "=transFilters"
    },
    controller: TransactionsFilterMenuController,
    controllerAs: TransactionsFilterMenuController.ControllerAs,
    template: $templateCache.get(Constants.TransactionsFilterMenuTemplateName)
  };
};

directive.$inject = ["$compile", "$templateCache"];

