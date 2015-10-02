/// <reference path="../../tsd.d.ts" />

import Constants = require("./Constants");
import PropertyDetailController = require("./PropertyDetailController");

export var DirectiveName = "propertyDetail";

export var Directive = function (): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
      propertyRequest: '=propertyRequest'
    },
    templateUrl: Constants.PropertyDetailTemplateName,
    controller: PropertyDetailController,
    controllerAs: PropertyDetailController.ControllerAs
  };
};
