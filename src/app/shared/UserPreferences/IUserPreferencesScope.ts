/// <reference path="../../tsd.d.ts" />
import NodeUtils = require("cd-node-utils");

interface IUserPreferencesScope extends ng.IScope {
    preferences: NodeUtils.UserPreferences.IUserPreferences;
}

export = IUserPreferencesScope;
