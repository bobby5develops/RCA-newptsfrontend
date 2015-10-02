/// <reference path="../../../tsd.d.ts" />

import * as NodeUtils from "cd-node-utils";

interface IKeywordFilterItemScope extends ng.IScope {
    keyword: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter;
    uniqueId: string;
}

export {IKeywordFilterItemScope}