/// <reference path="../../../tsd.d.ts" />

import {ICompanyFilterItemScope} from "./ICompanyFilterItemScope";
import * as NodeUtils from "cd-node-utils";

class CompanyFilterItemController {
    public static controllerName = "CompanyFilterItemController";
    public static controllerAs = "companyFilterItemCtrl";

    public static $inject = ["$log", "$scope"];

    constructor(private $log: ng.ILogService, private $scope: ICompanyFilterItemScope) {
        this.$log = this.$log.getInstance("Shared.TransactionFilters.CompanyFilters.CompanyFilterItemController");
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
        return this.$scope.company.input;
    }

    public set input(value: string) {
        this.$scope.company.input = value;
    }

    public get include(): boolean {
        return this.$scope.company.include;
    }

    public set include(value: boolean) {
        this.$scope.company.include = value;
    }

    public get isFilterAll(): boolean {
        return this.$scope.company.field === NodeUtils.Constants.Company.Roles.All;
    }

    public get isFilterBuyer(): boolean {
        return this.$scope.company.field === NodeUtils.Constants.Company.Roles.Buyer;
    }

    public get isFilterSeller(): boolean {
        return this.$scope.company.field === NodeUtils.Constants.Company.Roles.Seller;
    }

    public get isFilterBroker(): boolean {
        return this.$scope.company.field === NodeUtils.Constants.Company.Roles.Broker;
    }

    public get isFilterLender(): boolean {
        return this.$scope.company.field === NodeUtils.Constants.Company.Roles.Lender;
    }

    public setCompanyRole(role: string) {
        this.$scope.company.field = NodeUtils.Constants.Company.Roles[role];
    }
}

export {CompanyFilterItemController}
