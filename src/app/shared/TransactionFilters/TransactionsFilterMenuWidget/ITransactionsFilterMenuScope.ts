/// <reference path="../../../tsd.d.ts" />

import NodeUtils = require('cd-node-utils');

interface ITransactionsFilterMenuScope extends ng.IScope {
    TransactionSearchFilters: NodeUtils.PropertySearch.Filters.TransactionCharacteristics;
}

export = ITransactionsFilterMenuScope;
