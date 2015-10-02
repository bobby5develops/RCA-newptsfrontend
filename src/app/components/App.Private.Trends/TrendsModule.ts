import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates]);