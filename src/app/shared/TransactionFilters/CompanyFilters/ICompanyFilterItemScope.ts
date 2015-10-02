/// <reference path="../../../tsd.d.ts" />

import * as NodeUtils from "cd-node-utils";

interface ICompanyFilterItemScope extends ng.IScope {
    company: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter;
    uniqueId: string;
}

export {ICompanyFilterItemScope}