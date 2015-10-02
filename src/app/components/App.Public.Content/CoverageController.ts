/**
 * Created by mgilligan on 9/8/2015.
 */
/// <reference path="../../tsd.d.ts" />

// ReSharper disable once WrongExpressionStatement
"use strict";

class CoverageController {
    public static controllerName = "CoverageController";
    public static controllerAsName = "coverageCtrl";


    public static $inject = ["$log"];
    public coverage:any[] = [
        {
            "rowspan": 5,
            "zone_tx": "Americas",
            "country_tx": "United States",
            "vol2007_nb": "1455",
            "props2007_nb": "105346",
            "vol_nb": "4002",
            "props_nb": "275816"
        },
        {
            "rowspan": 0,
            "zone_tx": "Americas",
            "country_tx": "Canada",
            "vol2007_nb": "125",
            "props2007_nb": "7075",
            "vol_nb": "225",
            "props_nb": "11896"
        },
        {
            "rowspan": 0,
            "zone_tx": "Americas",
            "country_tx": "Brazil",
            "vol2007_nb": "43",
            "props2007_nb": "1227",
            "vol_nb": "53",
            "props_nb": "1587"
        },
        {
            "rowspan": 0,
            "zone_tx": "Americas",
            "country_tx": "Mexico",
            "vol2007_nb": "8",
            "props2007_nb": "705",
            "vol_nb": "25",
            "props_nb": "1871"
        },
        {
            "rowspan": 0,
            "zone_tx": "Americas",
            "country_tx": "Other",
            "vol2007_nb": "17",
            "props2007_nb": "769",
            "vol_nb": "25",
            "props_nb": "994"
        },
        {
            "rowspan": 10,
            "zone_tx": "EMEA",
            "country_tx": "United Kingdom",
            "vol2007_nb": "389",
            "props2007_nb": "12265",
            "vol_nb": "1039",
            "props_nb": "37054"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Germany",
            "vol2007_nb": "273",
            "props2007_nb": "13448",
            "vol_nb": "508",
            "props_nb": "32616"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "France",
            "vol2007_nb": "157",
            "props2007_nb": "6884",
            "vol_nb": "296",
            "props_nb": "11547"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Spain",
            "vol2007_nb": "64",
            "props2007_nb": "4995",
            "vol_nb": "113",
            "props_nb": "8260"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Sweden",
            "vol2007_nb": "76",
            "props2007_nb": "5482",
            "vol_nb": "141",
            "props_nb": "9990"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Netherlands",
            "vol2007_nb": "57",
            "props2007_nb": "4587",
            "vol_nb": "101",
            "props_nb": "6941"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Russia",
            "vol2007_nb": "65",
            "props2007_nb": "1531",
            "vol_nb": "96",
            "props_nb": "2947"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Mideast",
            "vol2007_nb": "35",
            "props2007_nb": "1430",
            "vol_nb": "47",
            "props_nb": "1590"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Africa",
            "vol2007_nb": "14",
            "props2007_nb": "796",
            "vol_nb": "22",
            "props_nb": "1261"
        },
        {
            "rowspan": 0,
            "zone_tx": "EMEA",
            "country_tx": "Other",
            "vol2007_nb": "283",
            "props2007_nb": "12348",
            "vol_nb": "512",
            "props_nb": "21778"
        },
        {
            "rowspan": 8,
            "zone_tx": "AsiaPac",
            "country_tx": "China",
            "vol2007_nb": "1221",
            "props2007_nb": "25678",
            "vol_nb": "2250",
            "props_nb": "48190"
        },
        {
            "rowspan": 0,
            "zone_tx": "AsiaPac",
            "country_tx": "Japan",
            "vol2007_nb": "273",
            "props2007_nb": "7457",
            "vol_nb": "562",
            "props_nb": "14392"
        },
        {
            "rowspan": 0,
            "zone_tx": "AsiaPac",
            "country_tx": "Australia/NZ",
            "vol2007_nb": "138",
            "props2007_nb": "6212",
            "vol_nb": "288",
            "props_nb": "12366"
        },
        {
            "rowspan": 0,
            "zone_tx": "AsiaPac",
            "country_tx": "Singapore",
            "vol2007_nb": "111",
            "props2007_nb": "1059",
            "vol_nb": "179",
            "props_nb": "1885"
        },
        {
            "rowspan": 0,
            "zone_tx": "AsiaPac",
            "country_tx": "Hong Kong",
            "vol2007_nb": "119",
            "props2007_nb": "4742",
            "vol_nb": "191",
            "props_nb": "7575"
        },
        {
            "rowspan": 0,
            "zone_tx": "AsiaPac",
            "country_tx": "India",
            "vol2007_nb": "51",
            "props2007_nb": "786",
            "vol_nb": "69",
            "props_nb": "1221"
        },
        {
            "rowspan": 0,
            "zone_tx": "AsiaPac",
            "country_tx": "Other",
            "vol2007_nb": "153",
            "props2007_nb": "4114",
            "vol_nb": "264",
            "props_nb": "7024"
        }
    ];
    public coveragePropertyTypes:any[] = [

        {
            "Main_Type_tx": "Office",
            "US_Vol_nb": "1254",
            "US_Props_nb": "46626",
            "NonUS_Vol_nb": "2014",
            "NonUS_Props_nb": "52166",
            "Total_Vol_nb": "3268",
            "Total_Props_nb": "98792"
        },
        {
            "Main_Type_tx": "Industrial",
            "US_Vol_nb": "496",
            "US_Props_nb": "58363",
            "NonUS_Vol_nb": "452",
            "NonUS_Props_nb": "30325",
            "Total_Vol_nb": "948",
            "Total_Props_nb": "88688"
        },
        {
            "Main_Type_tx": "Retail",
            "US_Vol_nb": "702",
            "US_Props_nb": "60740",
            "NonUS_Vol_nb": "1182",
            "NonUS_Props_nb": "56567",
            "Total_Vol_nb": "1884",
            "Total_Props_nb": "117307"
        },
        {
            "Main_Type_tx": "Apartment",
            "US_Vol_nb": "960",
            "US_Props_nb": "67283",
            "NonUS_Vol_nb": "376",
            "NonUS_Props_nb": "29237",
            "Total_Vol_nb": "1336",
            "Total_Props_nb": "96520"
        },
        {
            "Main_Type_tx": "Seniors Housing & Care",
            "US_Vol_nb": "85",
            "US_Props_nb": "6616",
            "NonUS_Vol_nb": "23",
            "NonUS_Props_nb": "1923",
            "Total_Vol_nb": "108",
            "Total_Props_nb": "8539"
        },
        {
            "Main_Type_tx": "Hotel",
            "US_Vol_nb": "294",
            "US_Props_nb": "15623",
            "NonUS_Vol_nb": "337",
            "NonUS_Props_nb": "11857",
            "Total_Vol_nb": "631",
            "Total_Props_nb": "27480"
        },
        {
            "Main_Type_tx": "Other",
            "US_Vol_nb": "27",
            "US_Props_nb": "4399",
            "NonUS_Vol_nb": "7",
            "NonUS_Props_nb": "745",
            "Total_Vol_nb": "34",
            "Total_Props_nb": "5144"
        },
        {
            "Main_Type_tx": "Dev Site",
            "US_Vol_nb": "186",
            "US_Props_nb": "16166",
            "NonUS_Vol_nb": "2614",
            "NonUS_Props_nb": "60166",
            "Total_Vol_nb": "2800",
            "Total_Props_nb": "76332"
        }
    ];
    constructor(private $log: ng.ILogService) {

        this.$log = this.$log.getInstance("components.Content.LeadershipController");
        this.$log.debug("Constructed", this);
    }

}

export = CoverageController;
