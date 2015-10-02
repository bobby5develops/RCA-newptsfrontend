/// <reference path="../../tsd.d.ts" />

import Constants = require("./Constants");

export var DirectiveName = "navBar";

export var Directive = function ():ng.IDirective {
  "use strict";

  return {
    restrict: "E",
    scope: true,
    templateUrl: Constants.NavbarTemplateName
  };
};
