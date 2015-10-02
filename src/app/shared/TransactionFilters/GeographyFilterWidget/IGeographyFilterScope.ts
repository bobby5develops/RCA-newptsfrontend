/// <reference path="../../../tsd.d.ts" />

import NodeUtils = require('cd-node-utils');

interface IGeographyFilterScope extends ng.IScope {
    setGeographyFilters(value: {include: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]; exclude: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]}):void;
}

export = IGeographyFilterScope;
