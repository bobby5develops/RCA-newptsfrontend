/// <reference path="../tsd.d.ts" />

declare module angular.translate {
  interface ITranslateProvider extends angular.IServiceProvider {
    useLoader(loaderFactory: string, options?: any): ITranslateProvider;
  }
}