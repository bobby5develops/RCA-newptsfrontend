declare module "angular-logger-shim" {
  var _: string;
  export = _;
}

declare module angular {
  interface ILogService {
    getInstance(instanceName: string): ILogService;
  }
}
