/// <reference path="../../../tsd.d.ts" />

import * as lodash from "lodash";
import * as NodeUtils from "cd-node-utils";
import {ICompanyFiltersScope} from"./ICompanyFiltersScope";
import TransactionFiltersService from "../TransactionFiltersService";

"use strict";

class CompanyFiltersController {
    public static controllerName: string = "CompanyFilterMenuController";
    public static controllerAs: string = "companyFiltersCtrl";

    public static $inject: string[] = [
        "$log",
        "$scope",
        TransactionFiltersService.serviceName
    ];

    public companyFilters: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[] = [];

    constructor(private $log: ng.ILogService, private $scope: ICompanyFiltersScope, private transactionFiltersService: TransactionFiltersService) {
        this.$log = $log.getInstance("Shared.TransactionFilters.CompanyFilters.CompanyFiltersController");

        if(this.transactionFiltersService.companyFilters.length> 0) {
            this.companyFilters = this.transactionFiltersService.companyFilters;
        } else {
            this.addCompany();
        }

        $scope.$watch(()=>this.companyFilters,
            (newValue: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[],
             oldValue: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter[])=> {
                if (!angular.equals(newValue, oldValue)) {
                    this.setValidCompanyFilters();
                }
            }, true);

        this.$log.debug("Constructed", this);
    }

    public addCompany() {
        this.companyFilters.push({
                input: null,
                field: NodeUtils.Constants.Company.Roles.All,
                include: true
            }
        );
    }

    private setValidCompanyFilters() {
        var validCompanyFilters = lodash.filter(this.companyFilters,
            (value: NodeUtils.PropertySearch.Filters.InputItems.IInputItemFilter)=> value.field !== null && value.include !== null && value.input !== null && value.input.length > 0);

        this.transactionFiltersService.companyFilters = validCompanyFilters;
    }
}

export default CompanyFiltersController;
