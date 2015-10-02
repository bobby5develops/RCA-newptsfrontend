/// <reference path="../../../tsd.d.ts" />

import NodeUtils = require("cd-node-utils");

interface IGeographyFilterItemScope extends ng.IScope {
  FilterItem: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter;
}

export = IGeographyFilterItemScope;