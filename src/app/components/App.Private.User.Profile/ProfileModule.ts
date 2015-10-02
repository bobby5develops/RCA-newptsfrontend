import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");
export import ProfileController = require("./ProfileController")

export var moduleName = Constants.moduleName;

angular.module(moduleName, [Templates])
    .controller(ProfileController.ControllerName, ProfileController);
