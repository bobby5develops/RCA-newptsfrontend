/// <reference path="../../../tsd.d.ts" />

import * as NodeUtils from "cd-node-utils";
import {IKeywordFilterItemScope} from "./IKeywordFilterItemScope";

"use strict";

class KeywordFilterItemController {
    public static controllerName = "KeywordFilterItemController";
    public static controllerAs = "keywordFilterItemCtrl";

    private keyword: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter;
    private radioId: string;

    public static $inject = ["$log", "$scope"];

    constructor(private $log: ng.ILogService, private $scope: IKeywordFilterItemScope) {
        this.$log = this.$log.getInstance("Shared.TransactionFilters.KeywordFilters.KeywordFilterItemController");
        this.$log.debug("Constructed", this);
    }

    private get uniqueId(): string {
        return this.$scope.uniqueId;
    }

    public get includeRadioUniqueId(): string{
        return `include_${this.uniqueId}`;
    }

    public get excludeRadioUniqueId(): string{
        return `exclue_${this.uniqueId}`;
    }

    public get input(): string {
        return this.$scope.keyword.input;
    }

    public set input(value: string) {
        this.$scope.keyword.input = value;
    }

    public get include(): boolean {
        return this.$scope.keyword.include;
    }

    public set include(value: boolean) {
        this.$scope.keyword.include = value;
    }

    public get isFilterAll(): boolean {
        return this.$scope.keyword.field === NodeUtils.PropertySearch.Filters.InputItems.Fields.All;
    }

    public get isFilterPropertyName(): boolean {
        return this.$scope.keyword.field === NodeUtils.PropertySearch.Filters.InputItems.Fields.PropertyName;
    }

    public get isFilterAddress(): boolean {
        return this.$scope.keyword.field === NodeUtils.PropertySearch.Filters.InputItems.Fields.Address;
    }

    public get isFilterComments(): boolean {
        return this.$scope.keyword.field === NodeUtils.PropertySearch.Filters.InputItems.Fields.Comments;
    }

    public get isFilterHotels(): boolean {
        return this.$scope.keyword.field === NodeUtils.PropertySearch.Filters.InputItems.Fields.Hotels;
    }

    public get isFilterTenants(): boolean {
        return this.$scope.keyword.field === NodeUtils.PropertySearch.Filters.InputItems.Fields.Tenants;
    }

    public setKeywordField(field: string) {
        this.$scope.keyword.field = NodeUtils.PropertySearch.Filters.InputItems.Fields[field];
    }
}

export default KeywordFilterItemController;
