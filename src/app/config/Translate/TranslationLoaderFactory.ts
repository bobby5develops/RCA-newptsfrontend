/// <reference path="../../tsd.d.ts" />

import Translations = require("./Translations");

export var FactoryName = "customTranslationLoader";

var inject = ["$q"];

export var Factory = function ($q: ng.IQService): (options: any)=>ng.IPromise<any> {
    "use strict";

    return function (options): any {

        var deferred = $q.defer();

        switch (options.key) {
            case "en":
                deferred.resolve(Translations.en);
                break;
            case "fr":
                deferred.resolve(Translations.fr);
                break;
            case "de":
                deferred.resolve(Translations.de);
                break;
            case "es":
                deferred.resolve(Translations.es);
                break;
        }

        return deferred.promise;
    };
};

Factory.$inject = inject;
