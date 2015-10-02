/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");

export import TriStateCheckboxWidgetDirective = require("./TriStateCheckboxWidgetDirective");

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [])
  .directive(TriStateCheckboxWidgetDirective.DirectiveName, TriStateCheckboxWidgetDirective.Directive);