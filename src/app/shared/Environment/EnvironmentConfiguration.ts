/**
 * An angular constants service module. It is naturally a singleton (i.e., only 1 is created by Angular) and cannot be
 * updated by other services.
 * TODO: generate this using something like gulp-ng-constants
 */
class EnvironmentConfiguration {
    public static ConstantName = "EnvironmentConfiguration";

    private BaseUrl = "https://pts.rcanalytics.local/";
    // TODO: We may want to considered a more uniformed versioning outside this. Right now we're using 2 versions.
    private APIv1 = "api/v1/";
    private APIv2 = "api/v2/";

    public get ServerBaseUrl() {
        return this.BaseUrl;
    }

    public get ServerAPIv1Url(): string {
        return this.BaseUrl + this.APIv1;
    }

    public get ServerAPIv2Url(): string {
        return this.BaseUrl + this.APIv2;
    }

}

export = EnvironmentConfiguration;
