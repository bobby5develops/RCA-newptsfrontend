import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");
export import LoginController = require("./LoginController");

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates])
  .controller(LoginController.controllerName, LoginController);