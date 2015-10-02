/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");
export import EnvironmentConfiguration = require("./EnvironmentConfiguration");

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [])
    .constant(EnvironmentConfiguration.ConstantName, new EnvironmentConfiguration());