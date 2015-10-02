/// <reference path="../../tsd.d.ts" />

import _                        = require("lodash");
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");
import PersonalInformation      = require("./PersonalInformation");
import ChangePassword           = require("./ChangePassword");
import NodeUtils                = require('cd-node-utils');
import {AuthenticationService} from "../../shared/authentication/AuthenticationModule";

// ReSharper disable once WrongExpressionStatement
"use strict";

/**
 * TODO rename to UserAccountService and make it a single facade for all User account data properties.
 * No need to break it up into micro-services when the backend shares the same data grouping.
 */
class UserPreferencesService {
    public static serviceName = "UserPreferencesService";
    public static $inject = [
        "$log",
        "$rootScope",
        "$http",
        "$q",
        EnvironmentConfiguration.ConstantName,
        AuthenticationService.serviceName
    ];

    public static userPreferencesLoadedEvent = "Shared.UserPreferences.UserPreferencesService.UserPreferencesLoadedEvent";
    public static userPreferencesChangedEvent = "Shared.UserPreferences.UserPreferencesService.UserPreferencesChangedEvent";

    private defferedUserPreferences: ng.IDeferred<NodeUtils.UserPreferences.IUserPreferences> = null;
    private personalInformation: PersonalInformation;

    public get userPreferences(): ng.IPromise<NodeUtils.UserPreferences.IUserPreferences> {
        return this.defferedUserPreferences ? this.defferedUserPreferences.promise : null;
    }

    private watchDeregister: Function;

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $http: ng.IHttpService,
                private $q: ng.IQService,
                private environment: EnvironmentConfiguration,
                private authenticationService: AuthenticationService) {
        this.$log = this.$log.getInstance("Shared.UserPreferences.UserPreferencesService");

        this.defferedUserPreferences = this.$q.defer<NodeUtils.UserPreferences.IUserPreferences>();

        var loadUserPreferences = () => {
            if (this.authenticationService.user != null) {
                this.getPreferences();
            } else {
                this.$log.error("loadUserPreferences being called without an user.");
            }
        };
        loadUserPreferences();

        $rootScope.$on(AuthenticationService.loginEvent, () => {
            loadUserPreferences();
        });

        $rootScope.$on(AuthenticationService.logoutEvent, () => {
            this.watchDeregister();
            this.watchDeregister = null;

            this.defferedUserPreferences = this.$q.defer<NodeUtils.UserPreferences.IUserPreferences>();
        });

        this.$log.debug("Constructed", this);
    }

    public get PersonalInformation(): ng.IPromise<PersonalInformation> {
        if (this.personalInformation != null) {
            var defer = this.$q.defer<PersonalInformation>();
            defer.resolve(this.personalInformation);
            return defer.promise;
        } else {
            return this.$http.get<PersonalInformation>(this.PersonalUrl).then((response: any) => {
                var data = response.data;
                this.personalInformation = new PersonalInformation(
                    data.email_tx,
                    data.firstName_tx,
                    data.lastName_tx,
                    data.address_tx,
                    data.country_tx,
                    data.stateProvince_tx,
                    data.city_tx);
                return this.personalInformation;
            })
        }
    }

    public UpdatePersonalInformation(info : PersonalInformation) : ng.IPromise<PersonalInformation> {
        return this.$http.put(this.PersonalUrl, info.toDAL()).then((response) => {
            this.$log.debug("Updated personal info");
            this.personalInformation = info;
            return info;
        }, (response) => {
            this.$log.error("Personal Information not updated", response);
            throw response;
        });
    }

    public ChangePassword(changePasswordInfo : ChangePassword) : ng.IPromise<boolean> {
        return this.$http.put(this.ChangePasswordUrl, changePasswordInfo.toDAL()).then((response) => {
            var data = <{ message : boolean }> response.data;
            this.$log.debug("Password Changed", data);
            return data.message;
        }, (response) => {
            this.$log.error("Password Change Error", response);
            throw response;
        });
    }

    public get PersonalUrl(): string {
        return this.environment.ServerAPIv1Url + "accountUser/" + this.authenticationService.user.AccountUserId + "/personal";
    }

    public get ChangePasswordUrl() : string {
        return this.environment.ServerAPIv1Url + "accountUser/" + this.authenticationService.user.AccountUserId + "/changePassword";
    }

    public get SettingsUrl(): string {
        return this.environment.ServerAPIv1Url + "accountUser/" + this.authenticationService.user.AccountUserId + "/settings";
    }

    private getPreferences(): void {
        this.$log.debug("Getting preferences");

        this.$http.get<NodeUtils.UserPreferences.IUserPreferences>(this.SettingsUrl)
            .then((response: any) => {
                var unit = NodeUtils.Constants.Measurements.Dictionary.findById(response.data.prefPropertyMeasure_id);
                var currency = NodeUtils.Constants.Currency.Dictionary.findById(response.data.prefCurrency_id);

                if (currency && unit) {
                    this.$log.debug("Preferences retrieved");
                    var userPrefrences = new NodeUtils.UserPreferences.UserPreferences(currency, unit);

                    this.defferedUserPreferences.resolve(userPrefrences);
                    this.watchDeregister = this.$rootScope.$watch(()=>userPrefrences, (newValue: NodeUtils.UserPreferences.IUserPreferences, oldValue: NodeUtils.UserPreferences.IUserPreferences)=> {
                        if (!angular.equals(newValue, oldValue)) {
                            this.$log.debug("UserPreferences Changed");
                            this.setPreferences(userPrefrences);
                            this.$rootScope.$broadcast(UserPreferencesService.userPreferencesChangedEvent);
                        }
                    }, true);

                    this.$rootScope.$broadcast(UserPreferencesService.userPreferencesLoadedEvent);
                } else {
                    var error = "Unable to find matching currency or unit types";
                    this.$log.error(error);
                    this.defferedUserPreferences.reject(error);
                }
            }, (response: any) => {
                var error = `Error fetching preferences: ${response}`;
                this.$log.error(error);
                this.defferedUserPreferences.reject(error);
            });
    }

    private setPreferences(userPreferences: NodeUtils.UserPreferences.IUserPreferences): ng.IPromise<boolean> {
        return this.$http.put(this.SettingsUrl, {
            "prefCurrency_id": userPreferences.currency.id,
            "prefPropertyMeasure_id": userPreferences.measurementUnit.id
        }).then((response) => {
            this.$log.debug("Updated userPreferences");
            return true;
        }, (response) => {
            // TODO what's the error format.
            this.$log.error("UserPreferences not updated", response);
            return false;
        });
    }
}

export = UserPreferencesService;
