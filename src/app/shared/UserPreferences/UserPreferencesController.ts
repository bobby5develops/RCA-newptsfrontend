/// <reference path="../../tsd.d.ts" />

import IUserPreferencesScope    = require("./IUserPreferencesScope");
import UserPreferencesService   = require("./UserPreferencesService");

import AuthenticationModule = require("../../shared/authentication/AuthenticationModule");
import AuthenticationService = AuthenticationModule.AuthenticationService;

import { Measurements, Constants, UserPreferences } from 'cd-node-utils'

// ReSharper disable once WrongExpressionStatement
"use strict";

class UserPreferencesController {

    public static ControllerName = "UserPreferencesController";
    public static ControllerAs = "userPrefCtrl";

    private static CurrencyDictionary: Measurements.Currency.Currency[] = Constants.Currency.Dictionary.getCurrencies();
    private static UnitDictionary: Measurements.Measurement.Measurement[] = Constants.Measurements.Dictionary.getMeasurements();

    public static $inject = ["$log", "$scope", "$q", UserPreferencesService.serviceName];

    public userPreferences: UserPreferences.IUserPreferences = null;

    constructor(private $log: ng.ILogService,
                private $scope: IUserPreferencesScope,
                private $q: ng.IQService,
                private userPreferencesService: UserPreferencesService) {
        this.$log = this.$log.getInstance("Shared.UserPreferences.UserPreferencesController");

        this.userPreferencesService.userPreferences.then(
            (userPreferences: UserPreferences.IUserPreferences)=> {
                this.userPreferences = userPreferences;
            },
            (result: any)=> {
            });

        this.$log.debug("Constructed", this);
    }

    public get currencyDictionary(): Measurements.Currency.Currency[] {
        return UserPreferencesController.CurrencyDictionary;
    }

    public get unitDictionary(): Measurements.Measurement.Measurement[] {
        return UserPreferencesController.UnitDictionary;
    }
}

export = UserPreferencesController;
