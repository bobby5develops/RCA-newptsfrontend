/// <reference path="../../../tsd.d.ts" />

import NodeUtils = require('cd-node-utils');

interface IPropertyDetailsFilterMenuScope extends ng.IScope {
    PropertyDetailsFilter: NodeUtils.PropertySearch.Filters.PropertyCharacteristics;
}

export = IPropertyDetailsFilterMenuScope;
