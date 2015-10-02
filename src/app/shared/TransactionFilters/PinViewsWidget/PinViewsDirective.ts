/// <reference path="../../../tsd.d.ts" />

'use strict';
import Constants = require("../Constants");
import PinViewsController = require('./PinViewsController');
export var directiveName = "pinViewFilter";

export var directive = function ($compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService): ng.IDirective {
  "use strict";

  return {
    restrict: 'E',
    scope: {
      pinView: "=pinView"
    },
    controller: PinViewsController,
    controllerAs: PinViewsController.ControllerAs,
    template: $templateCache.get(Constants.PinViewsTemplateName)
  };
};

directive.$inject = ["$compile", "$templateCache"];
