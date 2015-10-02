/// <reference path="../../tsd.d.ts" />

import User = require("./User");
import IAuthenticationResponse = require("./IAuthenticationResponse");
import EnvironmentConfiguration = require("../Environment/EnvironmentConfiguration");

// ReSharper disable once WrongExpressionStatement
"use strict";

class AuthenticationService {
    public static serviceName = "AuthenticationService";
    public static $inject = [
        "$log",
        "$rootScope",
        "$http",
        "$q",
        "$cookieStore",
        EnvironmentConfiguration.ConstantName
    ];

    public static loginEvent = "components.authentication.AuthenticationService.LoginEvent";
    public static logoutEvent = "components.authentication.AuthenticationService.LogoutEvent";
    public static authenticationCookieName = "jwt";
    public static userAlreadyLoggedInError = "User already logged in";
    public static userAlreadyLoggedOutError = "User already logged out";

    public static loginServiceUrl(url: string): string{
        return `${url}authentication/login`;
    }

    constructor(private $log: ng.ILogService,
                private $rootScope: ng.IRootScopeService,
                private $http: ng.IHttpService,
                private $q: ng.IQService,
                private $cookieStore: ng.cookies.ICookiesService,
                private environment: EnvironmentConfiguration) {
        this.$log = this.$log.getInstance("Shared.Authentication.AuthenticationService");

        var jwt = this.$cookieStore.get(AuthenticationService.authenticationCookieName);
        if (jwt != null) {
            this._jwt = jwt;
            this.$log.info(`Authentication loaded from cookie AccountUserId:${this.user.AccountUserId}`);
            this.$rootScope.$emit(AuthenticationService.loginEvent, this.user);
        }

        this.$log.debug("Constructed", this);
    }

    public login(username: string, password: string): ng.IPromise<IAuthenticationResponse> {
        if(this.isLoggedIn) throw AuthenticationService.userAlreadyLoggedInError;

        this.$log.debug(`Login Attempt:${username}`);

        var defer = this.$q.defer<IAuthenticationResponse>();

        this.$http.post(
            AuthenticationService.loginServiceUrl(this.environment.ServerAPIv2Url), {
                email: username,
                password: password
            }
        ).then((response: any) => {
                var data = response.data;
                if (data.error) {
                    var reason = data.message || data.error;
                    this.$log.error(`Login Failure: ${reason}`);

                    defer.reject(reason);
                }
                else {
                    this.jwt = data.token;
                    this.$rootScope.$emit(AuthenticationService.loginEvent, this.user);

                    defer.resolve({
                        errorMessage: null,
                        jwt: this.jwt,
                        user: this.user
                    });
                }
            }).catch((message) => {
                this.$log.error("Login Error");

                //Clear Jwt on error
                this.jwt = null;

                var errorMessage;
                switch (message.status) {

                    case 400:

                        var invalidEmail = _.get(message, 'data.validation.keys', []).indexOf('email') !== -1;
                        errorMessage = invalidEmail ? 'Sorry, we don\'t recognize that email address.' : 'Sorry, we couldn\'t authorize you. Try again';
                        break;

                    case 401:
                        errorMessage = 'The email and password you entered do not match.';
                        break;

                    case 403:
                        errorMessage = 'Your account has been locked.';
                        break;

                    case 404:
                        errorMessage = 'Sorry, we couldn\'t find a user with that email address.';
                        break;

                    default:
                        errorMessage = 'Sorry, we couldn\'t authorize you. Try again';
                        break;
                }

                defer.reject({errorMessage: errorMessage});
            });

        return defer.promise;
    }

    public logout(): ng.IPromise<boolean> {
        if(!this.isLoggedIn) throw AuthenticationService.userAlreadyLoggedOutError;

        var defer = this.$q.defer<boolean>();

        //Clear jwt
        this.jwt = null;
        this.$rootScope.$emit(AuthenticationService.logoutEvent);

        //do logout
        defer.resolve(true);
        return defer.promise;
    }

    public get isLoggedIn(): boolean {
        return this.user != null;
    }

    // ReSharper disable once InconsistentNaming
    private _jwt: string = null;
    public get jwt(): string {
        return this._jwt;
    }

    public set jwt(value: string) {
        if (value == null) {
            this.$cookieStore.remove(AuthenticationService.authenticationCookieName);
        }
        else {
            this.$cookieStore.put(AuthenticationService.authenticationCookieName, value);
        }
        this._jwt = value;
        this._user = null;
    }

    // Make this a instance function until we can fix the getter issue in mocking with get user
    private getUserFromJwt(jwt: string): User {
        // ensure jwt is string
        if (typeof jwt !== "string") return null;

        // ensure jwt is fully qualified (should 3 periods)
        var jwtSegments = jwt.split(".");
        if (jwtSegments.length !== 3) return null;

        // parse second segment with user data
        var decodedUser = JSON.parse(atob(jwtSegments[1]));
        return new User(
            decodedUser.accountUser_id,
            decodedUser.account_tx,
            decodedUser.firstName_tx,
            decodedUser.lastName_tx,
            decodedUser.isAccountAdmin_fg,
            decodedUser.isSystemAdmin_fg);
    }

    // ReSharper disable once InconsistentNaming
    private _user: User = null;
    public get user(): User {
        if (this._user == null) {
            this._user = this.getUserFromJwt(this.jwt);
        }

        return this._user;
    }
}

export = AuthenticationService;
