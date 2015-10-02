/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

import Constants = require("./Constants");
import Templates = require("./Templates");
import PropertyDetailDirective = require("./PropertyDetailDirective");
import LollipopLineChartWidget = require("../../shared/LollipopLineChartWidget/LollipopLineChartWidget");
import {IPropertyDetailRequest} from "./IPropertyDetailRequest"
import {IPropertyDetailResponse} from "./IPropertyDetailResponse"

var moduleName = Constants.ModuleName;

angular.module(moduleName, [Templates, LollipopLineChartWidget])
    .directive(PropertyDetailDirective.DirectiveName, PropertyDetailDirective.Directive);

export { moduleName, Constants, Templates, PropertyDetailDirective, IPropertyDetailRequest, IPropertyDetailResponse }