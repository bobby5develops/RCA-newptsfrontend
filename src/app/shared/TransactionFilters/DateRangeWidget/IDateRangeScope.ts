/// <reference path="../../../tsd.d.ts" />
import NodeUtils = require("cd-node-utils");

interface IDateRangeScope extends ng.IScope {
  DateRange: NodeUtils.PropertySearch.Filters.DateRange.IDateRange;
}

export = IDateRangeScope;
