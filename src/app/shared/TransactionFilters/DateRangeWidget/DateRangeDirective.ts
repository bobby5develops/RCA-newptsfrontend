/// <reference path="../../../tsd.d.ts" />

'use strict';
import Constants = require("../Constants");
import DateRangeController = require('./DateRangeController');
export var directiveName = "dateRangeFilter";

export var directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
  "use strict";

  return {
    restrict: 'E',
    scope: {
      DateRange: "=dateRange"
    },
    controller: DateRangeController,
    controllerAs: DateRangeController.ControllerAs,
    template: $templateCache.get(Constants.DateRangeTemplateName)
  };
};

directive.$inject = ["$compile", "$templateCache"];
