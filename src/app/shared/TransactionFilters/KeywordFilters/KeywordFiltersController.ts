/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import * as NodeUtils from "cd-node-utils";
import {IKeywordFiltersScope} from "./IKeywordFiltersScope";
import TransactionFiltersService from "../TransactionFiltersService";

"use strict";

class KeywordFiltersController {
    public static controllerName: string = "KeywordFiltersController";
    public static controllerAs: string = "keywordFiltersCtrl";

    public static $inject: string[] = [
        "$log",
        "$scope",
        TransactionFiltersService.serviceName
    ];

    public keywordFilters: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[] = [];

    constructor(private $log: ng.ILogService, private $scope: IKeywordFiltersScope, private transactionFiltersService: TransactionFiltersService) {
        this.$log = $log.getInstance("Shared.TransactionFilters.keywordFilters.KeywordFiltersController");

        if(this.transactionFiltersService.keywordFilters.length > 0) {
            this.keywordFilters = this.transactionFiltersService.keywordFilters;
        } else {
            this.addKeyword();
        }

        $scope.$watch(()=>this.keywordFilters,
            (newValue: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[],
             oldValue: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[])=> {
                if (!angular.equals(newValue, oldValue)) {
                    this.setValidCompanyFilters();
                }
            }, true);

        this.$log.debug("Constructed", this);
    }

    public addKeyword() {
        this.keywordFilters.push({
                input: null,
                field: NodeUtils.PropertySearch.Filters.InputItems.Fields.All,
                include: true
            }
        );
    }

    private setValidCompanyFilters() {
        var validKeywordFilters = lodash.filter(this.keywordFilters,
            (value: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter)=> value.field !== null && value.include !== null && value.input !== null && value.input.length > 0);

        this.transactionFiltersService.keywordFilters = validKeywordFilters;
    }
}

export default KeywordFiltersController;
