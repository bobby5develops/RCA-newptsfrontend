/// <reference path="../../../tsd.d.ts" />

import Constants = require("../Constants");
import GeographyFilterController = require("./GeographyFilterController");

export var directiveName = "geographyFilter";

export var directive = function (): ng.IDirective {
  "use strict";

  return {
    restrict: "E",
    scope: {
      setGeographyFilters: '&setGeographyFilters'
    },
    templateUrl: Constants.GeographyFilterTemplateName,
    controller: GeographyFilterController,
    controllerAs: GeographyFilterController.ControllerAs
  };
};
