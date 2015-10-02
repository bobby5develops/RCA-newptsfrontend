/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");
export import Templates = require("./Templates");

import EnvironmentModule = require("../Environment/EnvironmentModule");
import AuthenticationModule = require("../Authentication/AuthenticationModule");

export import UserPreferencesDirective = require("./UserPreferencesDirective");
export import UserPreferencesService = require("./UserPreferencesService");
export import PersonalInformation = require("./PersonalInformation");
export import ChangePassword = require("./ChangePassword");

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [Templates, EnvironmentModule.moduleName, AuthenticationModule.moduleName])
    .directive(UserPreferencesDirective.DirectiveName, UserPreferencesDirective.Directive)
    .service(UserPreferencesService.serviceName, UserPreferencesService);
