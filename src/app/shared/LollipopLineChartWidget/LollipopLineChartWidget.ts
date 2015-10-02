/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

import Constants = require("./Constants");

import LollipopLineChartDirective = require("./LollipopLineChartDirective");

var moduleName = Constants.ModuleName;

angular.module(moduleName, [])
  .directive(LollipopLineChartDirective.DirectiveName, LollipopLineChartDirective.Directive);

export = moduleName;
