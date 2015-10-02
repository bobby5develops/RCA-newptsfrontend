import * as angular from "angular";
import * as Constants from "./Constants";
import PropertyDetailController from "./PropertyDetailController"
import LollipopLineChartWidget = require("../../shared/LollipopLineChartWidget/LollipopLineChartWidget");
import Templates = require("./Templates");
let moduleName = Constants.moduleName;

angular.module(Constants.moduleName, [Templates, LollipopLineChartWidget])
    .controller(PropertyDetailController.controllerName, PropertyDetailController);

export { moduleName, Constants, Templates, PropertyDetailController }