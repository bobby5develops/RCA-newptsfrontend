import angular = require("angular");

import * as Constants from "./Constants";
import * as Templates from "./Templates";
import PropertiesController from "./PropertiesController"

import TransactionFiltersModule = require("../../shared/TransactionFilters/TransactionFiltersModule");

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates, TransactionFiltersModule.Constants.ModuleName])
    .controller(PropertiesController.controllerName, PropertiesController);

export {Constants, PropertiesController}