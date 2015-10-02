/// <reference path="../../tsd.d.ts" />

import angular = require("angular");

export import Constants = require("./Constants");
export import PlayersSearchService = require("./PlayersSearchService");

export var moduleName = Constants.ModuleName;
angular.module(moduleName, [])
    .service(PlayersSearchService.ServiceName, PlayersSearchService);