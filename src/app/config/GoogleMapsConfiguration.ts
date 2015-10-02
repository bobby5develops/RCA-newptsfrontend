class GoogleMapsConfiguration {
    public static $inject = ["uiGmapGoogleMapApiProvider"];

    constructor(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
          // key: "your api key",
            v: "3.17",
            libraries: "weather,visualization,drawing,geometry"
        });
    }
}

export = GoogleMapsConfiguration;
