/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");
export import User = require("./User");
export import AuthenticationService = require("./AuthenticationService");
export import IAuthenticationResponse = require("./IAuthenticationResponse");

export var moduleName = Constants.ModuleName;

angular.module(moduleName, [])
  .service(AuthenticationService.serviceName, AuthenticationService);