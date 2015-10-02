/// <reference path="../../tsd.d.ts" />

import _ = require("lodash");
import NodeUtils = require('cd-node-utils');
import { UserPreferencesService, PersonalInformation, ChangePassword } from "../../shared/UserPreferences/UserPreferencesModule";
import { GeoPermissionsService } from "../../shared/GeoPermissions/GeoPermissionsModule";
import { GeoShapeSearchService, GeoShapeSearchServiceRequest} from "../../shared/GeoShapeSearch/GeoShapeSearchModule";
import { MapMultiPolygon } from "../../shared/Parcels/ParcelsModule"

class ProfileController {

    public static ControllerName = "ProfileController";
    public static ControllerAsName = "profileCtrl";

    public static $inject = [
        "$log",
        "$scope",
        "$translate",
        "$q",
        "uiGmapGoogleMapApi",
        "uiGmapIsReady",
        UserPreferencesService.serviceName,
        GeoPermissionsService.ServiceName,
        GeoShapeSearchService.ServiceName
    ];

    public UserPreferences;
    public PersonalInformation: PersonalInformation;
    public PersonalResults: { success: boolean };
    public ChangePassword: ChangePassword;
    public ChangePasswordResults: { success: boolean };
    public ConfirmFailure: boolean = false;
    public Countries: any[] = countries;
    public States: any[];
    public Map = {center: {latitude: 45, longitude: -73}, zoom: 3};
    public Control = {
        refresh: function () {
        }
    };
    public MapPermissions = null;
    public MapStatuses = {
        init: {
            status: "Not Shown",
            type: "default"
        },
        loading: {
            status: "Loading...",
            type: "primary"
        },
        displayed: {
            status: "Displayed",
            type: "success"
        },
        error: {
            status: "Error",
            type: "danger"
        }
    };
    public MapStatus = this.MapStatuses.init;
    private MapReference: google.maps.Map;

    constructor(private $log: ng.ILogService,
                private $scope: ng.IScope,
                private $translate: ng.translate.ITranslateService,
                private $q: ng.IQService,
                private uiGmapGoogleMapApi: ng.IPromise<any>,
                private uiGmapIsReady: any,
                private userPreferences: UserPreferencesService,
                private geoPermissionsService: GeoPermissionsService,
                private geoShapeService: GeoShapeSearchService) {

        uiGmapIsReady.promise(1).then((gmap) => {
            this.MapReference = gmap[0].map;
        });

        userPreferences.PersonalInformation.then((personalInfo) => {
            this.PersonalInformation = personalInfo;
            this.ChangeStateProvidenceList(); // Init the states list.
        });

        this.ChangePassword = new ChangePassword(null, null, null);

        // Clear the messaging if the data has changed.
        $scope.$watch(() => this.PersonalInformation, (newValue, oldValue) => {
            if (!angular.equals(newValue, oldValue)) {
                this.PersonalResults = null;
            }
        }, true);

        $scope.$watch(() => this.ChangePassword, (newValue, oldValue) => {
            if (!angular.equals(newValue, oldValue)) {
                this.ChangePasswordResults = null;
                this.ConfirmFailure = false;
            }
        }, true);
    }

    public UpdatePersonal(): void {
        // TODO we should develop a better notification system (e.g., Growl or better inline messaging).
        this.userPreferences.UpdatePersonalInformation(this.PersonalInformation).then((results) => {
            this.PersonalResults = {success: true};
        }, () => {
            this.PersonalResults = {success: false};
        });
    }

    public UpdatePassword(): void {
        // TODO we should develop a better notification system (e.g., Growl or better inline messaging).
        if (this.ChangePassword.ConfirmMatches) {
            this.userPreferences.ChangePassword(this.ChangePassword).then((results) => {
                this.ChangePasswordResults = {success: results};
            }, () => {
                this.ChangePasswordResults = {success: false};
            });
        } else {
            this.ConfirmFailure = true;
        }
    }

    public LoadPermissions() {
        this.MapReference.data.forEach((feature) => {
            this.MapReference.data.remove(feature);
        });
        this.MapStatus = this.MapStatuses.loading;
        this.geoPermissionsService.GeoPermissionsSet.then((permissions: NodeUtils.PropertySearch.Filters.GeoPermissions.GeoPermissionsSet) => {
            if (_.size(permissions.geoPermissions) === 0) {
                this.$log.error("No permissions found", permissions);
                this.MapStatus = this.MapStatuses.error;
                throw "No permissions found";
            }

            // TODO doing this single element until we get tools and/or new format:
            var defaultPermissions = permissions.geoPermissions[0];

            var countryPromises = defaultPermissions.countryIds.map((id) => {
                var request = new GeoShapeSearchServiceRequest('country', id);
                return this.geoShapeService.SearchGeoShapesImmediate(request).catch(error => {
                    return null;
                });
            });

            var statePromises = defaultPermissions.stateProvidenceIds.map((id) => {
                var request = new GeoShapeSearchServiceRequest('stateprov', id);
                return this.geoShapeService.SearchGeoShapesImmediate(request).catch(error => {
                    return null;
                });
            });

            var zonePromises = defaultPermissions.zoneIds.map((id) => {
                var request = new GeoShapeSearchServiceRequest('zone', id);
                return this.geoShapeService.SearchGeoShapesImmediate(request).catch(error => {
                    return null;
                });
            });

            var allPromises = countryPromises.concat(statePromises).concat(zonePromises);

            this.$q.all(allPromises).then((results: GeoJSON.GeometryObject[]) => {
                var i = 0;
                var cleanResults = results.filter((item: any) => {
                    return !!item && !!item.coordinates;
                });
                var permissions = cleanResults.map((item: GeoJSON.GeometryObject) => {
                    return new MapPermission(item, {}, "" + i++);
                });

                this.MapReference.data.setStyle(MapPermissions.styles);
                this.MapPermissions = new MapPermissions(permissions);
                this.MapReference.data.addGeoJson(this.MapPermissions);
                this.MapStatus = this.MapStatuses.displayed;
            }, (error) => {
                this.MapStatus = this.MapStatuses.error;
            })
        });
    }

    /**
     * RCA uses name values as the input for Countries, this is not ideal for seleciton type input which the old site
     * uses and is still a requirement on the new. Because it is using names it makes it more tied to the view and
     * presentation and will break with translations. For now it will do it this way but will need to be more robust.
     */
    public ChangeStateProvidenceList() {
        if (this.PersonalInformation.country === "United States") {
            this.States = usTerritories;
        } else if (this.PersonalInformation.country === "Canada") {
            this.States = caTerritories;
        } else {
            this.States = null;
        }
    }

    public get IsStateRequired() {
        return this.States != null;
    }
}

class MapPermission implements GeoJSON.Feature {

    public type = "Feature";

    constructor(public geometry: GeoJSON.GeometryObject,
                public properties: any,
                public id?: string) {
    }
}

class MapPermissions implements GeoJSON.FeatureCollection {
    public static styles = {
        fillColor: "#0000FF",
        fillOpacity: 0.2,
        strokeColor: "#0000FF",
        strokeOpacity: 0.6,
        strokeWeight: 1
    };

    public type = "FeatureCollection";

    constructor(public features: GeoJSON.Feature[]) {
    }
}

// TODO replace with Server JSON
var countries = [
    {
        "name": "Afghanistan",
        "code": "AF",
        "continent": "Asia",
        "filename": "afghanistan"
    },
    {
        "name": "Åland Islands",
        "continent": "Europe",
        "code": "AX"
    },
    {
        "name": "Albania",
        "code": "AL",
        "continent": "Europe",
        "filename": "albania"
    },
    {
        "name": "Algeria",
        "code": "DZ",
        "continent": "Africa",
        "filename": "algeria"
    },
    {
        "name": "American Samoa",
        "code": "AS",
        "continent": "Oceania"
    },
    {
        "name": "Andorra",
        "code": "AD",
        "continent": "Europe",
        "filename": "andorra"
    },
    {
        "name": "Angola",
        "code": "AO",
        "continent": "Africa",
        "filename": "angola"
    },
    {
        "name": "Anguilla",
        "code": "AI",
        "continent": "North America"
    },
    {
        "name": "Antarctica",
        "continent": "Antarctica",
        "code": "AQ"
    },
    {
        "name": "Antigua and Barbuda",
        "code": "AG",
        "continent": "North America",
        "filename": "antigua-and-barbuda"
    },
    {
        "name": "Argentina",
        "code": "AR",
        "continent": "South America",
        "filename": "argentina"
    },
    {
        "name": "Armenia",
        "code": "AM",
        "continent": "Europe",
        "filename": "armenia"
    },
    {
        "name": "Aruba",
        "code": "AW",
        "continent": "Europe"
    },
    {
        "name": "Australia",
        "code": "AU",
        "continent": "Oceania",
        "filename": "australia"
    },
    {
        "name": "Austria",
        "code": "AT",
        "continent": "Europe",
        "filename": "austria"
    },
    {
        "name": "Azerbaijan",
        "code": "AZ",
        "continent": "Europe",
        "filename": "azerbaijan"
    },
    {
        "name": "Bahamas",
        "code": "BS",
        "continent": "North America",
        "filename": "bahamas"
    },
    {
        "name": "Bahrain",
        "code": "BH",
        "continent": "Asia",
        "filename": "bahrain"
    },
    {
        "name": "Bangladesh",
        "code": "BD",
        "continent": "Asia",
        "filename": "bangladesh"
    },
    {
        "name": "Barbados",
        "code": "BB",
        "continent": "North America",
        "filename": "barbados"
    },
    {
        "name": "Belarus",
        "code": "BY",
        "continent": "Europe",
        "filename": "belarus"
    },
    {
        "name": "Belgium",
        "code": "BE",
        "continent": "Europe",
        "filename": "belgium"
    },
    {
        "name": "Belize",
        "code": "BZ",
        "continent": "North America",
        "filename": "belize"
    },
    {
        "name": "Benin",
        "code": "BJ",
        "continent": "Africa",
        "filename": "benin"
    },
    {
        "name": "Bermuda",
        "code": "BM",
        "continent": "North America"
    },
    {
        "name": "Bhutan",
        "code": "BT",
        "continent": "Asia",
        "filename": "bhutan"
    },
    {
        "name": "Bolivia",
        "code": "BO",
        "continent": "South America",
        "filename": "bolivia"
    },
    {
        "name": "Bosnia and Herzegovina",
        "code": "BA",
        "continent": "Europe",
        "filename": "bosnia-and-herzegovina"
    },
    {
        "name": "Botswana",
        "code": "BW",
        "continent": "Africa",
        "filename": "botswana"
    },
    {
        "name": "Bouvet Island",
        "continent": "Antarctica",
        "code": "BV"
    },
    {
        "name": "Brazil",
        "code": "BR",
        "continent": "South America",
        "filename": "brazil"
    },
    {
        "name": "British Indian Ocean Territory",
        "continent": "Africa",
        "code": "IO"
    },
    {
        "name": "Brunei Darussalam",
        "code": "BN",
        "continent": "Asia",
        "filename": "brunei-darussalam"
    },
    {
        "name": "Bulgaria",
        "code": "BG",
        "continent": "Europe",
        "filename": "bulgaria"
    },
    {
        "name": "Burkina Faso",
        "code": "BF",
        "continent": "Africa",
        "filename": "burkina-faso"
    },
    {
        "name": "Burundi",
        "code": "BI",
        "continent": "Africa",
        "filename": "burundi"
    },
    {
        "name": "Cambodia",
        "code": "KH",
        "continent": "Asia",
        "filename": "cambodia"
    },
    {
        "name": "Cameroon",
        "code": "CM",
        "continent": "Africa",
        "filename": "cameroon"
    },
    {
        "name": "Canada",
        "code": "CA",
        "continent": "North America",
        "filename": "canada"
    },
    {
        "name": "Cape Verde",
        "code": "CV",
        "continent": "Africa",
        "filename": "cape-verde"
    },
    {
        "name": "Cayman Islands",
        "code": "KY",
        "continent": "North America"
    },
    {
        "name": "Central African Republic",
        "code": "CF",
        "continent": "Africa",
        "filename": "central-african-republic"
    },
    {
        "name": "Chad",
        "code": "TD",
        "continent": "Africa",
        "filename": "chad"
    },
    {
        "name": "Chile",
        "code": "CL",
        "continent": "South America",
        "filename": "chile"
    },
    {
        "name": "China",
        "code": "CN",
        "continent": "Asia",
        "filename": "china"
    },
    {
        "name": "Christmas Island",
        "code": "CX",
        "continent": "Oceania"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "code": "CC",
        "continent": "Oceania"
    },
    {
        "name": "Colombia",
        "code": "CO",
        "continent": "South America",
        "filename": "colombia"
    },
    {
        "name": "Comoros",
        "code": "KM",
        "continent": "Africa",
        "filename": "comoros"
    },
    {
        "name": "Congo",
        "code": "CG",
        "continent": "Africa",
        "filename": "congo"
    },
    {
        "name": "Congo, The Democratic Republic of the",
        "code": "CD",
        "continent": "Africa",
        "filename": "congo-the-democratic-republic-of-the"
    },
    {
        "name": "Cook Islands",
        "continent": "Oceania",
        "code": "CK"
    },
    {
        "name": "Costa Rica",
        "code": "CR",
        "continent": "North America",
        "filename": "costa-rica"
    },
    {
        "name": "Côte d'Ivoire, Republic of",
        "code": "CI",
        "continent": "Africa",
        "filename": "cote-d-ivoire-republic-of"
    },
    {
        "name": "Croatia",
        "code": "HR",
        "continent": "Europe",
        "filename": "croatia"
    },
    {
        "name": "Cuba",
        "code": "CU",
        "continent": "North America",
        "filename": "cuba"
    },
    {
        "name": "Curaçao",
        "code": "CW",
        "continent": "Europe"
    },
    {
        "name": "Cyprus",
        "code": "CY",
        "continent": "Europe",
        "filename": "cyprus"
    },
    {
        "name": "Czech Republic",
        "code": "CZ",
        "continent": "Europe",
        "filename": "czech-republic"
    },
    {
        "name": "Denmark",
        "code": "DK",
        "continent": "Europe",
        "filename": "denmark"
    },
    {
        "name": "Djibouti",
        "code": "DJ",
        "continent": "Africa",
        "filename": "djibouti"
    },
    {
        "name": "Dominica",
        "code": "DM",
        "continent": "North America",
        "filename": "dominica"
    },
    {
        "name": "Dominican Republic",
        "code": "DO",
        "continent": "North America",
        "filename": "dominican-republic"
    },
    {
        "name": "Ecuador",
        "code": "EC",
        "continent": "South America",
        "filename": "ecuador"
    },
    {
        "name": "Egypt",
        "code": "EG",
        "continent": "Africa",
        "filename": "egypt"
    },
    {
        "name": "El Salvador",
        "code": "SV",
        "continent": "North America",
        "filename": "el-salvador"
    },
    {
        "name": "Equatorial Guinea",
        "code": "GQ",
        "continent": "Africa",
        "filename": "equatorial-guinea"
    },
    {
        "name": "Eritrea",
        "code": "ER",
        "continent": "Africa",
        "filename": "eritrea"
    },
    {
        "name": "Estonia",
        "code": "EE",
        "continent": "Europe",
        "filename": "estonia"
    },
    {
        "name": "Ethiopia",
        "code": "ET",
        "continent": "Africa",
        "filename": "ethiopia"
    },
    {
        "name": "Falkland Islands (Malvinas)",
        "code": "FK",
        "continent": "South America"
    },
    {
        "name": "Faroe Islands",
        "continent": "Europe",
        "code": "FO"
    },
    {
        "name": "Fiji",
        "code": "FJ",
        "continent": "Oceania",
        "filename": "fiji"
    },
    {
        "name": "Finland",
        "code": "FI",
        "continent": "Europe",
        "filename": "finland"
    },
    {
        "name": "France",
        "code": "FR",
        "continent": "Europe",
        "filename": "france"
    },
    {
        "name": "French Guiana",
        "code": "GF",
        "continent": "South America"
    },
    {
        "name": "French Polynesia",
        "code": "PF",
        "continent": "Oceania"
    },
    {
        "name": "French Southern Territories",
        "continent": "Antarctica",
        "code": "TF"
    },
    {
        "name": "Gabon",
        "code": "GA",
        "continent": "Africa",
        "filename": "gabon"
    },
    {
        "name": "Gambia",
        "code": "GM",
        "continent": "Africa",
        "filename": "gambia"
    },
    {
        "name": "Georgia",
        "code": "GE",
        "continent": "Europe",
        "filename": "georgia"
    },
    {
        "name": "Germany",
        "code": "DE",
        "continent": "Europe",
        "filename": "germany"
    },
    {
        "name": "Ghana",
        "code": "GH",
        "continent": "Africa",
        "filename": "ghana"
    },
    {
        "name": "Gibraltar",
        "continent": "Europe",
        "code": "GI"
    },
    {
        "name": "Greece",
        "code": "GR",
        "continent": "Europe",
        "filename": "greece"
    },
    {
        "name": "Greenland",
        "code": "GL",
        "continent": "North America",
        "filename": "greenland"
    },
    {
        "name": "Grenada",
        "code": "GD",
        "continent": "North America",
        "filename": "grenada"
    },
    {
        "name": "Guadeloupe",
        "code": "GP",
        "continent": "North America"
    },
    {
        "name": "Guam",
        "code": "GU",
        "continent": "Oceania"
    },
    {
        "name": "Guatemala",
        "code": "GT",
        "continent": "North America",
        "filename": "guatemala"
    },
    {
        "name": "Guernsey",
        "continent": "Europe",
        "code": "GG"
    },
    {
        "name": "Guinea",
        "code": "GN",
        "continent": "Africa",
        "filename": "guinea"
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW",
        "continent": "Africa",
        "filename": "guinea-bissau"
    },
    {
        "name": "Guyana",
        "code": "GY",
        "continent": "South America",
        "filename": "guyana"
    },
    {
        "name": "Haiti",
        "code": "HT",
        "continent": "North America",
        "filename": "haiti"
    },
    {
        "name": "Heard Island and Mcdonald Islands",
        "continent": "Oceania",
        "code": "HM"
    },
    {
        "name": "Holy See (Vatican City State)",
        "code": "VA",
        "continent": "Europe"
    },
    {
        "name": "Honduras",
        "code": "HN",
        "continent": "North America",
        "filename": "honduras"
    },
    {
        "name": "Hong Kong",
        "code": "HK",
        "continent": "Asia",
        "filename": "hong-kong"
    },
    {
        "name": "Hungary",
        "code": "HU",
        "continent": "Europe",
        "filename": "hungary"
    },
    {
        "name": "Iceland",
        "code": "IS",
        "continent": "Europe",
        "filename": "iceland"
    },
    {
        "name": "India",
        "code": "IN",
        "continent": "Asia",
        "filename": "india"
    },
    {
        "name": "Indonesia",
        "code": "ID",
        "continent": "Asia",
        "filename": "indonesia"
    },
    {
        "name": "Iran, Islamic Republic Of",
        "code": "IR",
        "continent": "Asia",
        "filename": "iran-islamic-republic-of"
    },
    {
        "name": "Iraq",
        "code": "IQ",
        "continent": "Asia",
        "filename": "iraq"
    },
    {
        "name": "Ireland",
        "code": "IE",
        "continent": "Europe",
        "filename": "ireland"
    },
    {
        "name": "Isle of Man",
        "continent": "Europe",
        "code": "IM"
    },
    {
        "name": "Israel",
        "code": "IL",
        "continent": "Asia",
        "filename": "israel"
    },
    {
        "name": "Italy",
        "code": "IT",
        "continent": "Europe",
        "filename": "italy"
    },
    {
        "name": "Jamaica",
        "code": "JM",
        "continent": "North America",
        "filename": "jamaica"
    },
    {
        "name": "Japan",
        "code": "JP",
        "continent": "Asia",
        "filename": "japan"
    },
    {
        "name": "Jersey",
        "continent": "Europe",
        "code": "JE"
    },
    {
        "name": "Jordan",
        "code": "JO",
        "continent": "Asia",
        "filename": "jordan"
    },
    {
        "name": "Kazakhstan",
        "code": "KZ",
        "continent": "Europe",
        "filename": "kazakhstan"
    },
    {
        "name": "Kenya",
        "code": "KE",
        "continent": "Africa",
        "filename": "kenya"
    },
    {
        "name": "Kiribati",
        "code": "KI",
        "continent": "Oceania",
        "filename": "kiribati"
    },
    {
        "name": "Korea, Democratic People's Republic of",
        "code": "KP",
        "continent": "Asia",
        "filename": "korea-democratic-people-s-republic-of"
    },
    {
        "name": "Korea, Republic of",
        "code": "KR",
        "continent": "Asia",
        "filename": "korea-republic-of"
    },
    {
        "name": "Kuwait",
        "code": "KW",
        "continent": "Asia",
        "filename": "kuwait"
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG",
        "continent": "Asia",
        "filename": "kyrgyzstan"
    },
    {
        "name": "Lao People's Democratic Republic",
        "code": "LA",
        "continent": "Asia",
        "filename": "lao-people-s-democratic-republic"
    },
    {
        "name": "Latvia",
        "code": "LV",
        "continent": "Europe",
        "filename": "latvia"
    },
    {
        "name": "Lebanon",
        "code": "LB",
        "continent": "Asia",
        "filename": "lebanon"
    },
    {
        "name": "Lesotho",
        "code": "LS",
        "continent": "Africa",
        "filename": "lesotho"
    },
    {
        "name": "Liberia",
        "code": "LR",
        "continent": "Africa",
        "filename": "liberia"
    },
    {
        "name": "Libyan Arab Jamahiriya",
        "code": "LY",
        "continent": "Africa",
        "filename": "libyan-arab-jamahiriya"
    },
    {
        "name": "Liechtenstein",
        "code": "LI",
        "continent": "Europe",
        "filename": "liechtenstein"
    },
    {
        "name": "Lithuania",
        "code": "LT",
        "continent": "Europe",
        "filename": "lithuania"
    },
    {
        "name": "Luxembourg",
        "code": "LU",
        "continent": "Europe",
        "filename": "luxembourg"
    },
    {
        "name": "Macao",
        "code": "MO",
        "continent": "Asia"
    },
    {
        "name": "Macedonia, The Former Yugoslav Republic of",
        "code": "MK",
        "continent": "Europe",
        "filename": "macedonia-the-former-yugoslav-republic-of"
    },
    {
        "name": "Madagascar",
        "code": "MG",
        "continent": "Africa",
        "filename": "madagascar"
    },
    {
        "name": "Malawi",
        "code": "MW",
        "continent": "Africa",
        "filename": "malawi"
    },
    {
        "name": "Malaysia",
        "code": "MY",
        "continent": "Asia",
        "filename": "malaysia"
    },
    {
        "name": "Maldives",
        "code": "MV",
        "continent": "Asia",
        "filename": "maldives"
    },
    {
        "name": "Mali",
        "code": "ML",
        "continent": "Africa",
        "filename": "mali"
    },
    {
        "name": "Malta",
        "code": "MT",
        "continent": "Europe",
        "filename": "malta"
    },
    {
        "name": "Marshall Islands",
        "code": "MH",
        "continent": "Oceania",
        "filename": "marshall-islands"
    },
    {
        "name": "Martinique",
        "code": "MQ",
        "continent": "North America"
    },
    {
        "name": "Mauritania",
        "code": "MR",
        "continent": "Africa",
        "filename": "mauritania"
    },
    {
        "name": "Mauritius",
        "code": "MU",
        "continent": "Africa",
        "filename": "mauritius"
    },
    {
        "name": "Mayotte",
        "code": "YT",
        "continent": "Africa"
    },
    {
        "name": "Mexico",
        "code": "MX",
        "continent": "North America",
        "filename": "mexico"
    },
    {
        "name": "Micronesia, Federated States of",
        "code": "FM",
        "continent": "Oceania",
        "filename": "micronesia-federated-states-of"
    },
    {
        "name": "Moldova, Republic of",
        "code": "MD",
        "continent": "Europe",
        "filename": "moldova-republic-of"
    },
    {
        "name": "Monaco",
        "code": "MC",
        "continent": "Europe",
        "filename": "monaco"
    },
    {
        "name": "Mongolia",
        "code": "MN",
        "continent": "Asia",
        "filename": "mongolia"
    },
    {
        "name": "Montenegro",
        "code": "ME",
        "continent": "Europe",
        "filename": "montenegro"
    },
    {
        "name": "Montserrat",
        "code": "MS",
        "continent": "North America"
    },
    {
        "name": "Morocco",
        "code": "MA",
        "continent": "Africa",
        "filename": "morocco"
    },
    {
        "name": "Mozambique",
        "code": "MZ",
        "continent": "Africa",
        "filename": "mozambique"
    },
    {
        "name": "Myanmar",
        "code": "MM",
        "continent": "Asia",
        "filename": "myanmar"
    },
    {
        "name": "Namibia",
        "code": "NA",
        "continent": "Africa",
        "filename": "namibia"
    },
    {
        "name": "Nauru",
        "code": "NR",
        "continent": "Oceania",
        "filename": "nauru"
    },
    {
        "name": "Nepal",
        "code": "NP",
        "continent": "Asia",
        "filename": "nepal"
    },
    {
        "name": "Netherlands",
        "code": "NL",
        "continent": "Europe",
        "filename": "netherlands"
    },
    {
        "name": "Netherlands Antilles",
        "code": "AN",
        "continent": "Europe"
    },
    {
        "name": "New Caledonia",
        "code": "NC",
        "continent": "Oceania"
    },
    {
        "name": "New Zealand",
        "code": "NZ",
        "continent": "Oceania",
        "filename": "new-zealand"
    },
    {
        "name": "Nicaragua",
        "code": "NI",
        "continent": "North America",
        "filename": "nicaragua"
    },
    {
        "name": "Niger",
        "code": "NE",
        "continent": "Africa",
        "filename": "niger"
    },
    {
        "name": "Nigeria",
        "code": "NG",
        "continent": "Africa",
        "filename": "nigeria"
    },
    {
        "name": "Niue",
        "continent": "Oceania",
        "code": "NU"
    },
    {
        "name": "Norfolk Island",
        "code": "NF",
        "continent": "Oceania"
    },
    {
        "name": "Northern Mariana Islands",
        "continent": "Oceania",
        "code": "MP"
    },
    {
        "name": "Norway",
        "code": "NO",
        "continent": "Europe",
        "filename": "norway"
    },
    {
        "name": "Oman",
        "code": "OM",
        "continent": "Asia",
        "filename": "oman"
    },
    {
        "name": "Pakistan",
        "code": "PK",
        "continent": "Asia",
        "filename": "pakistan"
    },
    {
        "name": "Palau",
        "code": "PW",
        "continent": "Oceania",
        "filename": "palau"
    },
    {
        "name": "Palestinian Territory, Occupied",
        "code": "PS",
        "continent": "Asia",
        "filename": "palestinian-territory-occupied"
    },
    {
        "name": "Panama",
        "code": "PA",
        "continent": "North America",
        "filename": "panama"
    },
    {
        "name": "Papua New Guinea",
        "code": "PG",
        "continent": "Oceania",
        "filename": "papua-new-guinea"
    },
    {
        "name": "Paraguay",
        "code": "PY",
        "continent": "South America",
        "filename": "paraguay"
    },
    {
        "name": "Peru",
        "code": "PE",
        "continent": "South America",
        "filename": "peru"
    },
    {
        "name": "Philippines",
        "code": "PH",
        "continent": "Asia",
        "filename": "philippines"
    },
    {
        "name": "Pitcairn",
        "continent": "Oceania",
        "code": "PN"
    },
    {
        "name": "Poland",
        "code": "PL",
        "continent": "Europe",
        "filename": "poland"
    },
    {
        "name": "Portugal",
        "code": "PT",
        "continent": "Europe",
        "filename": "portugal"
    },
    {
        "name": "Puerto Rico",
        "code": "PR",
        "continent": "North America"
    },
    {
        "name": "Qatar",
        "code": "QA",
        "continent": "Asia",
        "filename": "qatar"
    },
    {
        "name": "Réunion",
        "code": "RE",
        "continent": "Africa"
    },
    {
        "name": "Romania",
        "code": "RO",
        "continent": "Europe",
        "filename": "romania"
    },
    {
        "name": "Russian Federation",
        "code": "RU",
        "continent": "Europe",
        "filename": "russian-federation"
    },
    {
        "name": "Rwanda",
        "code": "RW",
        "continent": "Africa",
        "filename": "rwanda"
    },
    {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "code": "SH",
        "continent": "Africa",
        "filename": "saint-helena-ascension-and-tristan-da-cunha"
    },
    {
        "name": "Saint Kitts and Nevis",
        "code": "KN",
        "continent": "North America",
        "filename": "saint-kitts-and-nevis"
    },
    {
        "name": "Saint Lucia",
        "code": "LC",
        "continent": "North America",
        "filename": "saint-lucia"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "code": "PM",
        "continent": "North America"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "code": "VC",
        "continent": "North America",
        "filename": "saint-vincent-and-the-grenadines"
    },
    {
        "name": "Samoa",
        "code": "WS",
        "continent": "Oceania",
        "filename": "samoa"
    },
    {
        "name": "San Marino",
        "code": "SM",
        "continent": "Europe",
        "filename": "san-marino"
    },
    {
        "name": "São Tomé and Príncipe",
        "code": "ST",
        "continent": "Africa",
        "filename": "sao-tome-and-principe"
    },
    {
        "name": "Saudi Arabia",
        "code": "SA",
        "continent": "Asia",
        "filename": "saudi-arabia"
    },
    {
        "name": "Senegal",
        "code": "SN",
        "continent": "Africa",
        "filename": "senegal"
    },
    {
        "name": "Serbia",
        "code": "RS",
        "continent": "Europe",
        "filename": "serbia"
    },
    {
        "name": "Seychelles",
        "code": "SC",
        "continent": "Africa",
        "filename": "seychelles"
    },
    {
        "name": "Sierra Leone",
        "code": "SL",
        "continent": "Africa",
        "filename": "sierra-leone"
    },
    {
        "name": "Singapore",
        "code": "SG",
        "continent": "Asia",
        "filename": "singapore"
    },
    {
        "name": "Sint Maarten",
        "code": "SX",
        "continent": "Europe"
    },
    {
        "name": "Slovakia",
        "code": "SK",
        "continent": "Europe",
        "filename": "slovakia"
    },
    {
        "name": "Slovenia",
        "code": "SI",
        "continent": "Europe",
        "filename": "slovenia"
    },
    {
        "name": "Solomon Islands",
        "code": "SB",
        "continent": "Oceania",
        "filename": "solomon-islands"
    },
    {
        "name": "Somalia",
        "code": "SO",
        "continent": "Africa",
        "filename": "somalia"
    },
    {
        "name": "South Africa",
        "code": "ZA",
        "continent": "Africa",
        "filename": "south-africa"
    },
    {
        "name": "South Georgia and the South Sandwich Islands",
        "code": "GS",
        "continent": "South America"
    },
    {
        "name": "South Sudan",
        "code": "SS",
        "continent": "Africa",
        "filename": "south-sudan"
    },
    {
        "name": "Spain",
        "code": "ES",
        "continent": "Europe",
        "filename": "spain"
    },
    {
        "name": "Sri Lanka",
        "code": "LK",
        "continent": "Asia",
        "filename": "sri-lanka"
    },
    {
        "name": "Sudan",
        "code": "SD",
        "continent": "Africa",
        "filename": "sudan"
    },
    {
        "name": "Suriname",
        "code": "SR",
        "continent": "South America",
        "filename": "suriname"
    },
    {
        "name": "Svalbard and Jan Mayen",
        "continent": "Europe",
        "code": "SJ"
    },
    {
        "name": "Swaziland",
        "code": "SZ",
        "continent": "Africa",
        "filename": "swaziland"
    },
    {
        "name": "Sweden",
        "code": "SE",
        "continent": "Europe",
        "filename": "sweden"
    },
    {
        "name": "Switzerland",
        "code": "CH",
        "continent": "Europe",
        "filename": "switzerland"
    },
    {
        "name": "Syrian Arab Republic",
        "code": "SY",
        "continent": "Asia",
        "filename": "syrian-arab-republic"
    },
    {
        "name": "Taiwan, Province of China",
        "code": "TW",
        "continent": "Asia",
        "filename": "taiwan-province-of-china"
    },
    {
        "name": "Tajikistan",
        "code": "TJ",
        "continent": "Asia",
        "filename": "tajikistan"
    },
    {
        "name": "Tanzania, United Republic of",
        "code": "TZ",
        "continent": "Africa",
        "filename": "tanzania-united-republic-of"
    },
    {
        "name": "Thailand",
        "code": "TH",
        "continent": "Asia",
        "filename": "thailand"
    },
    {
        "name": "Timor-Leste",
        "code": "TL",
        "continent": "Oceania",
        "filename": "timor-leste"
    },
    {
        "name": "Togo",
        "code": "TG",
        "continent": "Africa",
        "filename": "togo"
    },
    {
        "name": "Tokelau",
        "continent": "Oceania",
        "code": "TK"
    },
    {
        "name": "Tonga",
        "code": "TO",
        "continent": "Oceania",
        "filename": "tonga"
    },
    {
        "name": "Trinidad and Tobago",
        "code": "TT",
        "continent": "North America",
        "filename": "trinidad-and-tobago"
    },
    {
        "name": "Tunisia",
        "code": "TN",
        "continent": "Africa",
        "filename": "tunisia"
    },
    {
        "name": "Turkey",
        "code": "TR",
        "continent": "Europe",
        "filename": "turkey"
    },
    {
        "name": "Turkmenistan",
        "code": "TM",
        "continent": "Asia",
        "filename": "turkmenistan"
    },
    {
        "name": "Turks and Caicos Islands",
        "code": "TC",
        "continent": "North America"
    },
    {
        "name": "Tuvalu",
        "code": "TV",
        "continent": "Oceania",
        "filename": "tuvalu"
    },
    {
        "name": "Uganda",
        "code": "UG",
        "continent": "Africa",
        "filename": "uganda"
    },
    {
        "name": "Ukraine",
        "code": "UA",
        "continent": "Europe",
        "filename": "ukraine"
    },
    {
        "name": "United Arab Emirates",
        "code": "AE",
        "continent": "Asia",
        "filename": "united-arab-emirates"
    },
    {
        "name": "United Kingdom",
        "code": "GB",
        "continent": "Europe",
        "filename": "united-kingdom"
    },
    {
        "name": "United States",
        "code": "US",
        "continent": "North America",
        "filename": "united-states"
    },
    {
        "name": "United States Minor Outlying Islands",
        "code": "UM",
        "continent": "North America",
        "filename": "united-states-minor-outlying-islands"
    },
    {
        "name": "Uruguay",
        "code": "UY",
        "continent": "South America",
        "filename": "uruguay"
    },
    {
        "name": "Uzbekistan",
        "code": "UZ",
        "continent": "Asia",
        "filename": "uzbekistan"
    },
    {
        "name": "Vanuatu",
        "code": "VU",
        "continent": "Oceania",
        "filename": "vanuatu"
    },
    {
        "name": "Venezuela",
        "code": "VE",
        "continent": "South America",
        "filename": "venezuela"
    },
    {
        "name": "Viet Nam",
        "code": "VN",
        "continent": "Asia",
        "filename": "viet-nam"
    },
    {
        "name": "Virgin Islands, British",
        "code": "VG",
        "continent": "North America"
    },
    {
        "name": "Virgin Islands, U.S.",
        "code": "VI",
        "continent": "North America"
    },
    {
        "name": "Wallis and Futuna",
        "continent": "Oceania",
        "code": "WF"
    },
    {
        "name": "Western Sahara",
        "continent": "Africa",
        "code": "EH"
    },
    {
        "name": "Yemen",
        "code": "YE",
        "continent": "Asia",
        "filename": "yemen"
    },
    {
        "name": "Zambia",
        "code": "ZM",
        "continent": "Africa",
        "filename": "zambia"
    },
    {
        "name": "Zimbabwe",
        "code": "ZW",
        "continent": "Africa",
        "filename": "zimbabwe"
    }
];

// TODO replace with Server JSON
var usTerritories = [
    {
        "name": "District of Columbia",
        "code": "US-DC",
        "subdivision": "district"
    },
    {
        "name": "American Samoa",
        "code": "US-AS",
        "subdivision": "outlying territory"
    },
    {
        "name": "Guam",
        "code": "US-GU",
        "subdivision": "outlying territory"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "US-MP",
        "subdivision": "outlying territory"
    },
    {
        "name": "Puerto Rico",
        "code": "US-PR",
        "subdivision": "outlying territory"
    },
    {
        "name": "United States Minor Outlying Islands",
        "code": "US-UM",
        "subdivision": "outlying territory"
    },
    {
        "name": "Virgin Islands, U.S.",
        "code": "US-VI",
        "subdivision": "outlying territory"
    },
    {
        "name": "Alabama",
        "code": "US-AL",
        "subdivision": "state"
    },
    {
        "name": "Alaska",
        "code": "US-AK",
        "subdivision": "state"
    },
    {
        "name": "Arizona",
        "code": "US-AZ",
        "subdivision": "state"
    },
    {
        "name": "Arkansas",
        "code": "US-AR",
        "subdivision": "state"
    },
    {
        "name": "California",
        "code": "US-CA",
        "subdivision": "state"
    },
    {
        "name": "Colorado",
        "code": "US-CO",
        "subdivision": "state"
    },
    {
        "name": "Connecticut",
        "code": "US-CT",
        "subdivision": "state"
    },
    {
        "name": "Delaware",
        "code": "US-DE",
        "subdivision": "state"
    },
    {
        "name": "Florida",
        "code": "US-FL",
        "subdivision": "state"
    },
    {
        "name": "Georgia",
        "code": "US-GA",
        "subdivision": "state"
    },
    {
        "name": "Hawaii",
        "code": "US-HI",
        "subdivision": "state"
    },
    {
        "name": "Idaho",
        "code": "US-ID",
        "subdivision": "state"
    },
    {
        "name": "Illinois",
        "code": "US-IL",
        "subdivision": "state"
    },
    {
        "name": "Indiana",
        "code": "US-IN",
        "subdivision": "state"
    },
    {
        "name": "Iowa",
        "code": "US-IA",
        "subdivision": "state"
    },
    {
        "name": "Kansas",
        "code": "US-KS",
        "subdivision": "state"
    },
    {
        "name": "Kentucky",
        "code": "US-KY",
        "subdivision": "state"
    },
    {
        "name": "Louisiana",
        "code": "US-LA",
        "subdivision": "state"
    },
    {
        "name": "Maine",
        "code": "US-ME",
        "subdivision": "state"
    },
    {
        "name": "Maryland",
        "code": "US-MD",
        "subdivision": "state"
    },
    {
        "name": "Massachusetts",
        "code": "US-MA",
        "subdivision": "state"
    },
    {
        "name": "Michigan",
        "code": "US-MI",
        "subdivision": "state"
    },
    {
        "name": "Minnesota",
        "code": "US-MN",
        "subdivision": "state"
    },
    {
        "name": "Mississippi",
        "code": "US-MS",
        "subdivision": "state"
    },
    {
        "name": "Missouri",
        "code": "US-MO",
        "subdivision": "state"
    },
    {
        "name": "Montana",
        "code": "US-MT",
        "subdivision": "state"
    },
    {
        "name": "Nebraska",
        "code": "US-NE",
        "subdivision": "state"
    },
    {
        "name": "Nevada",
        "code": "US-NV",
        "subdivision": "state"
    },
    {
        "name": "New Hampshire",
        "code": "US-NH",
        "subdivision": "state"
    },
    {
        "name": "New Jersey",
        "code": "US-NJ",
        "subdivision": "state"
    },
    {
        "name": "New Mexico",
        "code": "US-NM",
        "subdivision": "state"
    },
    {
        "name": "New York",
        "code": "US-NY",
        "subdivision": "state"
    },
    {
        "name": "North Carolina",
        "code": "US-NC",
        "subdivision": "state"
    },
    {
        "name": "North Dakota",
        "code": "US-ND",
        "subdivision": "state"
    },
    {
        "name": "Ohio",
        "code": "US-OH",
        "subdivision": "state"
    },
    {
        "name": "Oklahoma",
        "code": "US-OK",
        "subdivision": "state"
    },
    {
        "name": "Oregon",
        "code": "US-OR",
        "subdivision": "state"
    },
    {
        "name": "Pennsylvania",
        "code": "US-PA",
        "subdivision": "state"
    },
    {
        "name": "Rhode Island",
        "code": "US-RI",
        "subdivision": "state"
    },
    {
        "name": "South Carolina",
        "code": "US-SC",
        "subdivision": "state"
    },
    {
        "name": "South Dakota",
        "code": "US-SD",
        "subdivision": "state"
    },
    {
        "name": "Tennessee",
        "code": "US-TN",
        "subdivision": "state"
    },
    {
        "name": "Texas",
        "code": "US-TX",
        "subdivision": "state"
    },
    {
        "name": "Utah",
        "code": "US-UT",
        "subdivision": "state"
    },
    {
        "name": "Vermont",
        "code": "US-VT",
        "subdivision": "state"
    },
    {
        "name": "Virginia",
        "code": "US-VA",
        "subdivision": "state"
    },
    {
        "name": "Washington",
        "code": "US-WA",
        "subdivision": "state"
    },
    {
        "name": "West Virginia",
        "code": "US-WV",
        "subdivision": "state"
    },
    {
        "name": "Wisconsin",
        "code": "US-WI",
        "subdivision": "state"
    },
    {
        "name": "Wyoming",
        "code": "US-WY",
        "subdivision": "state"
    }
];

// TODO replace with Server JSON
var caTerritories = [
    {
        "name": "Alberta",
        "code": "CA-AB",
        "subdivision": "province",
        "native": "Alberta"
    },
    {
        "name": "British Columbia",
        "code": "CA-BC",
        "subdivision": "province",
        "native": "Colombie-Britannique"
    },
    {
        "name": "Manitoba",
        "code": "CA-MB",
        "subdivision": "province",
        "native": "Manitoba"
    },
    {
        "name": "New Brunswick",
        "code": "CA-NB",
        "subdivision": "province",
        "native": "Nouveau-Brunswick"
    },
    {
        "name": "Newfoundland and Labrador",
        "code": "CA-NL",
        "subdivision": "province",
        "native": "Terre-Neuve-et-Labrador"
    },
    {
        "name": "Nova Scotia",
        "code": "CA-NS",
        "subdivision": "province",
        "native": "Nouvelle-Écosse"
    },
    {
        "name": "Ontario",
        "code": "CA-ON",
        "subdivision": "province",
        "native": "Ontario"
    },
    {
        "name": "Prince Edward Island",
        "code": "CA-PE",
        "subdivision": "province",
        "native": "Île-du-Prince-Édouard"
    },
    {
        "name": "Quebec",
        "code": "CA-QC",
        "subdivision": "province",
        "native": "Québec"
    },
    {
        "name": "Saskatchewan",
        "code": "CA-SK",
        "subdivision": "province",
        "native": "Saskatchewan"
    },
    {
        "name": "Northwest Territories",
        "code": "CA-NT",
        "subdivision": "territory",
        "native": "Territoires du Nord-Ouest"
    },
    {
        "name": "Nunavut",
        "code": "CA-NU",
        "subdivision": "territory",
        "native": "Nunavut"
    },
    {
        "name": "Yukon",
        "code": "CA-YT",
        "subdivision": "territory",
        "native": "Yukon"
    }
];

export = ProfileController
