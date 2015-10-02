import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");
export import NavbarModule = require("../../shared/Navbar/NavbarModule");

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates, NavbarModule.moduleName]);