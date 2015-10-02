import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");
export import NavbarController = require("./NavbarController");
export import NavbarDirective = require("./NavbarDirective");

import UserPreferences = require("../../shared/UserPreferences/UserPreferencesModule");
import {Constants as TransactionFiltersConstants} from "../../shared/TransactionFilters/TransactionFiltersModule";

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [Templates, UserPreferences.moduleName, TransactionFiltersConstants.ModuleName])
  .controller(NavbarController.controllerName, NavbarController)
  .directive(NavbarDirective.DirectiveName, NavbarDirective.Directive);