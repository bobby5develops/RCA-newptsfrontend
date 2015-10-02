/// <reference path="../../tsd.d.ts" />

import TranslationLoaderFactory = require("./TranslationLoaderFactory");

class TranslateConfiguration {
  public static $inject = ["$translateProvider"];

  constructor($translateProvider: ng.translate.ITranslateProvider) {
    $translateProvider.preferredLanguage("en");
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useLoader(TranslationLoaderFactory.FactoryName);
  }
}

export = TranslateConfiguration;
