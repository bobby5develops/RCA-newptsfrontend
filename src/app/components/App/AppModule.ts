import angular = require("angular");

import Constants = require("./Constants");
import Templates = require("./Templates");
import NavbarModule = require("../../shared/Navbar/NavbarModule");
import AppController from "./AppController"

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates, NavbarModule.moduleName])
    .controller(AppController.controllerName, AppController);

export { Constants, Templates, NavbarModule, AppController}