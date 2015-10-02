/// <reference path="../../../tsd.d.ts" />

import _                                = require("lodash");
import IGeographyFilterScope            = require("./IGeographyFilterScope");
import GeographyFilterSet               = require("./GeographyFilterSet");
import GeographyFilterItemController    = require("./GeographyFilterItemController");
import IGeographyFilterItemDescription  = require("./IGeographyFilterItemDescription");
import IGeographyFilterSetDescription   = require("./IGeographyFilterSetDescription");
import NodeUtils                        = require('cd-node-utils')
import {IShapeListItem} from "../../CustomShapes/CustomShapeModule";
import {CustomShapeService} from "../../CustomShapes/CustomShapeModule";
import ISavedShape from "../../CustomShapes/ISavedShape";

"use strict";

class GeographyFilterController {
    public static ControllerName = "GeographyFilterController";
    public static ControllerAs = "geogFilterCtrl";
    public static shapeRetrievedEvent = "GeographyFilterController.ShapeRetrieved";
    public static $inject = ["$log", "$scope", "$rootScope", CustomShapeService.serviceName];
    public static GeographyData: IGeographyFilterSetDescription[] = [
        {
            Name: "Americas",
            Type: NodeUtils.Constants.Geography.Types.RCAZone,
            Id: 1,
            Theatres: [
                {
                    Name: "Americas",
                    Type: NodeUtils.Constants.Geography.Types.RCAZone,
                    Id: 1
                },
                {
                    Name: "North America",
                    Type: NodeUtils.Constants.Geography.Types.Continent,
                    Id: 1
                },
                {
                    Name: "Latin America",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 9,
                    Children: [
                        {
                            Name: "Caribbean",
                            Type: NodeUtils.Constants.Geography.Types.MarketTier,
                            Id: 7
                        },
                        {
                            Name: "Central America",
                            Type: NodeUtils.Constants.Geography.Types.MarketTier,
                            Id: 8
                        },
                        {
                            Name: "South America",
                            Type: NodeUtils.Constants.Geography.Types.Continent,
                            Id: 5
                        }
                    ]
                }
            ],
            Countries: [
                {
                    Name: "Argentina",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 12
                },
                {
                    Name: "Brazil",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 32
                },
                {
                    Name: "Canada",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 40,
                    Children: [
                        {
                            Name: "CA Provinces",
                            Children: [
                                {
                                    Name: "Alberta",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2369
                                },
                                {
                                    Name: "British Columbia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 545
                                },
                                {
                                    Name: "New Brunswick",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2169
                                },
                                {
                                    Name: "Nova Scotia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3954
                                },
                                {
                                    Name: "Ontario",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3818
                                },
                                {
                                    Name: "Quebec",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3822
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Chile",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 45
                },
                {
                    Name: "Colombia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 49
                },
                {
                    Name: "Costa Rica",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 54
                },
                {
                    Name: "Mexico",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 143
                },
                {
                    Name: "Peru",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 174
                },
                {
                    Name: "Puerto Rico",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 179
                },
                {
                    Name: "United States",
                    Id: 1,
                    Children: [
                        {
                            Name: "US States",
                            Children: [
                                {
                                    Name: "Alabama",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 37
                                },
                                {
                                    Name: "Alaska",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 15
                                },
                                {
                                    Name: "Arizona",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 41
                                },
                                {
                                    Name: "Arkansas",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 34
                                },
                                {
                                    Name: "California",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 28
                                },
                                {
                                    Name: "Colorado",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 10
                                },
                                {
                                    Name: "Connecticut",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 24
                                },
                                {
                                    Name: "Delaware",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 5
                                },
                                {
                                    Name: "Florida",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 33
                                },
                                {
                                    Name: "Georgia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 40
                                },
                                {
                                    Name: "Hawaii",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 48
                                },
                                {
                                    Name: "Idaho",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 39
                                },
                                {
                                    Name: "Illinois",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 7
                                },
                                {
                                    Name: "Indiana",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 6
                                },
                                {
                                    Name: "Iowa",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 35
                                },
                                {
                                    Name: "Kansas",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2
                                },
                                {
                                    Name: "Kentucky",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 50
                                },
                                {
                                    Name: "Louisiana",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 25
                                },
                                {
                                    Name: "Maine",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 14
                                },
                                {
                                    Name: "Maryland",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 9
                                },
                                {
                                    Name: "Massachusetts",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 19
                                },
                                {
                                    Name: "Michigan",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 12
                                },
                                {
                                    Name: "Minnesota",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 30
                                },
                                {
                                    Name: "Mississippi",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 42
                                },
                                {
                                    Name: "Missouri",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 26
                                },
                                {
                                    Name: "Montana",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 31
                                },
                                {
                                    Name: "Nebraska",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 45
                                },
                                {
                                    Name: "Nevada",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 20
                                },
                                {
                                    Name: "New Hampshire",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 8
                                },
                                {
                                    Name: "New Jersey",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 27
                                },
                                {
                                    Name: "New Mexico",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 49
                                },
                                {
                                    Name: "New York",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 21
                                },
                                {
                                    Name: "North Carolina",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 44
                                },
                                {
                                    Name: "North Dakota",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 38
                                },
                                {
                                    Name: "Ohio",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 22
                                },
                                {
                                    Name: "Oklahoma",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 32
                                },
                                {
                                    Name: "Oregon",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 29
                                },
                                {
                                    Name: "Pennsylvania",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3
                                },
                                {
                                    Name: "Rhode Island",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 17
                                },
                                {
                                    Name: "South Carolina",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 16
                                },
                                {
                                    Name: "South Dakota",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 23
                                },
                                {
                                    Name: "Tennessee",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 43
                                },
                                {
                                    Name: "Texas",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 1
                                },
                                {
                                    Name: "Utah",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 51
                                },
                                {
                                    Name: "Vermont",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 36
                                },
                                {
                                    Name: "Virginia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 13
                                },
                                {
                                    Name: "Washington",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 18
                                },
                                {
                                    Name: "West Virginia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 46
                                },
                                {
                                    Name: "Wisconsin",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 4
                                },
                                {
                                    Name: "Wyoming",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 47
                                }
                            ]
                        },
                        {
                            Name: "US Market Tiers",
                            Children: [
                                {
                                    Name: "6 Major Metros",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 4
                                },
                                {
                                    Name: "Non-Major Metros",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 5
                                }
                            ]
                        },
                        {
                            Name: "US Regions",
                            Children: [
                                {
                                    Name: "RCA - Mid-Atlantic",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 1
                                },
                                {
                                    Name: "RCA - US Midwest",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 2
                                },
                                {
                                    Name: "RCA - US Northeast",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 3
                                },
                                {
                                    Name: "RCA - US Southeast",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 4
                                },
                                {
                                    Name: "RCA - US Southwest",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 5
                                },
                                {
                                    Name: "RCA - West",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 6
                                }
                            ]
                        },
                        {
                            Name: "US NCREIF Regions",
                            Children: [
                                {
                                    Name: "NCREIF - East",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 22
                                },
                                {
                                    Name: "NCREIF - Midwest",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 23
                                },
                                {
                                    Name: "NCREIF - South",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 24
                                },
                                {
                                    Name: "NCREIF - West",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 25
                                }
                            ]
                        }
                    ]
                }
            ],
            MetrosAndMarkets: [
                {
                    Name: "Atlanta",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 17
                },
                {
                    Name: "Austin",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 18
                },
                {
                    Name: "Baltimore",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 670
                },
                {
                    Name: "Birmingham (AL)",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 20
                },
                {
                    Name: "Boston",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 21
                },
                {
                    Name: "Calgary",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 374
                },
                {
                    Name: "Charlotte",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 26
                },
                {
                    Name: "Chicago",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 27
                },
                {
                    Name: "Cincinnati",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 28
                },
                {
                    Name: "Cleveland",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 29
                },
                {
                    Name: "Columbus",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 32
                },
                {
                    Name: "Dallas",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 34
                },
                {
                    Name: "DC Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 37,
                    Children: [
                        {
                            Name: "DC Markets",
                            Children: [
                                {
                                    Name: "DC",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 39
                                },
                                {
                                    Name: "DC MD burbs",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 40
                                },
                                {
                                    Name: "DC VA burbs",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 41
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Denver",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 38
                },
                {
                    Name: "Detroit",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 39
                },
                {
                    Name: "Greensboro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 45
                },
                {
                    Name: "Hartford",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 48
                },
                {
                    Name: "Honolulu",
                    Type: NodeUtils.Constants.Geography.Types.City,
                    Id: 102376
                },
                {
                    Name: "Houston",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 50
                },
                {
                    Name: "Indianapolis",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 51
                },
                {
                    Name: "Jacksonville",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 52
                },
                {
                    Name: "Kansas City",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 53
                },
                {
                    Name: "Las Vegas",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 56
                },
                {
                    Name: "LA Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 55,
                    Children: [
                        {
                            Name: "LA Markets",
                            Children: [
                                {
                                    Name: "Inland Empire",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 57
                                },
                                {
                                    Name: "Los Angeles",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 65
                                },
                                {
                                    Name: "Orange Co",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 83
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Louisville",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 59
                },
                {
                    Name: "Memphis",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 61
                },
                {
                    Name: "Mexico City",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 415
                },
                {
                    Name: "Milwaukee",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 62
                },
                {
                    Name: "Minneapolis",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 63
                },
                {
                    Name: "Montreal",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 365
                },
                {
                    Name: "Nashville",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 66
                },
                {
                    Name: "NYC Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 69,
                    Children: [
                        {
                            Name: "NYC Markets",
                            Children: [
                                {
                                    Name: "Long Island",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 64
                                },
                                {
                                    Name: "Manhattan",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 67
                                },
                                {
                                    Name: "No NJ",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 77
                                },
                                {
                                    Name: "NYC Boroughs",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 80
                                },
                                {
                                    Name: "Stamford",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 105
                                },
                                {
                                    Name: "Westchester",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 112
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Norfolk",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 68
                },
                {
                    Name: "Orlando",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 72
                },
                {
                    Name: "Ottawa",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 375
                },
                {
                    Name: "Phila Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 73,
                    Children: [
                        {
                            Name: "Phila Markets",
                            Children: [
                                {
                                    Name: "Philadelphia",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 86
                                },
                                {
                                    Name: "So NJ",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 103
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Phoenix",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 74
                },
                {
                    Name: "Pittsburgh",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 75
                },
                {
                    Name: "Portland",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 76
                },
                {
                    Name: "Raleigh/Durham",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 78
                },
                {
                    Name: "Richmond",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 80
                },
                {
                    Name: "Rio de Janeiro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 395
                },
                {
                    Name: "Sacramento",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 82
                },
                {
                    Name: "Salt Lake City",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 83
                },
                {
                    Name: "San Antonio",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 84
                },
                {
                    Name: "San Diego",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 85
                },
                {
                    Name: "SF Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 88,
                    Children: [
                        {
                            Name: "SF Markets",
                            Children: [
                                {
                                    Name: "North/East Bay",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 9
                                },
                                {
                                    Name: "San Francisco",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 99
                                },
                                {
                                    Name: "San Jose",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 100
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Seattle",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 87
                },
                {
                    Name: "So Fla",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 89,
                    Children: [
                        {
                            Name: "So Fla Markets",
                            Children: [
                                {
                                    Name: "Broward",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 23
                                },
                                {
                                    Name: "Miami",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 70
                                },
                                {
                                    Name: "Palm Beach",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 85
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "St Louis",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 90
                },
                {
                    Name: "Santiago",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 398
                },
                {
                    Name: "Sao Paulo",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 394
                },
                {
                    Name: "SW Florida",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 91
                },
                {
                    Name: "Tampa",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 93
                },
                {
                    Name: "Toronto",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 367
                },
                {
                    Name: "Tucson",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 95
                },
                {
                    Name: "Vancouver",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 387
                },

            ],

        },
        {
            Name: "AsiaPac",
            Type: NodeUtils.Constants.Geography.Types.RCAZone,
            Id: 3,
            Theatres: [
                {
                    Name: "Asia",
                    Type: NodeUtils.Constants.Geography.Types.Continent,
                    Id: 3
                },
                {
                    Name: "SE Asia",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 11
                },
                {
                    Name: "East Asia",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 5
                },
                {
                    Name: "Australia - NZ",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 3
                },
                {
                    Name: "Asia Excluding Japan",
                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                    Id: 10
                },

            ],
            Countries: [
                {
                    Name: "Australia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 15,
                    Children: [
                        {
                            Name: "AU States",
                            Children: [
                                {
                                    Name: "New South Wales",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2170
                                },
                                {
                                    Name: "Queensland",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2598
                                },
                                {
                                    Name: "South Australia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3882
                                },
                                {
                                    Name: "Victoria",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2986
                                },
                                {
                                    Name: "Western Australia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2753
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Cambodia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 38
                },
                {
                    Name: "China",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 46,
                    Children: [
                        {
                            Name: "PRC Market Tiers",
                            Children: [
                                {
                                    Name: "China Market Tier 1",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 2
                                },
                                {
                                    Name: "China Market Tier 2",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 3
                                }
                            ]
                        },
                        {
                            Name: "RCA PRC Regions",
                            Children: [
                                {
                                    Name: "Central China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 362
                                },
                                {
                                    Name: "East China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 359
                                },
                                {
                                    Name: "North China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 361
                                },
                                {
                                    Name: "Northeast China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 360
                                },
                                {
                                    Name: "Northwest China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 364
                                },
                                {
                                    Name: "Southern China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 363
                                },
                                {
                                    Name: "Southwest China",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 365
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Hong Kong",
                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                    Id: 99
                },
                {
                    Name: "India",
                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                    Id: 102
                },
                {
                    Name: "Indonesia",
                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                    Id: 103
                },
                {
                    Name: "Japan",
                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                    Id: 111,
                    Children: [
                        {
                            Name: "Japanese Regions",
                            Children: [
                                {
                                    Name: "Chubu",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 16
                                },
                                {
                                    Name: "Chugoku",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 12
                                },
                                {
                                    Name: "Hokkaido",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 13
                                },
                                {
                                    Name: "Kansai",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 17
                                },
                                {
                                    Name: "Kanto",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 15
                                },
                                {
                                    Name: "Kyushu",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 20
                                },
                                {
                                    Name: "Shikoku",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 19
                                },
                                {
                                    Name: "Touhoku",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 14
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Macau",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 130
                },
                {
                    Name: "Malaysia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 134
                },
                {
                    Name: "New Zealand",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 159
                },
                {
                    Name: "Philippines",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 175
                },
                {
                    Name: "Singapore",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 198
                },
                {
                    Name: "South Korea",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 118
                },
                {
                    Name: "Taiwan",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 214
                },
                {
                    Name: "Thailand",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 217
                },
                {
                    Name: "Vietnam",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 238
                },

            ],
            MetrosAndMarkets: [
                {
                    Name: "Adelaide",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 398
                },
                {
                    Name: "Beijing",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 362
                },
                {
                    Name: "Brisbane",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 370
                },
                {
                    Name: "Changchun",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 613
                },
                {
                    Name: "Changsha",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 436
                },
                {
                    Name: "Changzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 563
                },
                {
                    Name: "Chengdu",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 437
                },
                {
                    Name: "Chongqing",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 438
                },
                {
                    Name: "Dalian",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 472
                },
                {
                    Name: "Delhi / New Delhi",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 406
                },
                {
                    Name: "Foshan",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 439
                },
                {
                    Name: "Fukuoka",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 477
                },
                {
                    Name: "Fuzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 475
                },
                {
                    Name: "Gold Coast",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 452
                },
                {
                    Name: "Guangzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 440
                },
                {
                    Name: "Guiyang",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 647
                },
                {
                    Name: "Hangzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 371
                },
                {
                    Name: "Hefei",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 607
                },
                {
                    Name: "Hong Kong",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 356,
                    Children: [
                        {
                            Name: "Hong Kong Markets",
                            Children: [
                                {
                                    Name: "Hong Kong Island",
                                    Type: NodeUtils.Constants.Geography.Types.Metro,
                                    Id: 864
                                },
                                {
                                    Name: "Kowloon",
                                    Type: NodeUtils.Constants.Geography.Types.Metro,
                                    Id: 865
                                },
                                {
                                    Name: "New Territories",
                                    Type: NodeUtils.Constants.Geography.Types.Metro,
                                    Id: 866
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Huai'an",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 641
                },
                {
                    Name: "Hyogo",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 1753
                },
                {
                    Name: "Jiaxing",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 648
                },
                {
                    Name: "Jinan",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 645
                },
                {
                    Name: "Kuala Lumpur",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 388
                },
                {
                    Name: "Kunming",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 649
                },
                {
                    Name: "Melbourne",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 366
                },
                {
                    Name: "Mumbai",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 574
                },
                {
                    Name: "Nagoya",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 573
                },
                {
                    Name: "Nanchang",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 566
                },
                {
                    Name: "Nanjing",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 441
                },
                {
                    Name: "Nanning",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 611
                },
                {
                    Name: "Nantong",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 556
                },
                {
                    Name: "Ningbo",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 605
                },
                {
                    Name: "Osaka",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 413
                },
                {
                    Name: "Perth",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 381
                },
                {
                    Name: "Qingdao",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 606
                },
                {
                    Name: "Sapporo",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 561
                },
                {
                    Name: "Seoul",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 361
                },
                {
                    Name: "Shanghai",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 359
                },
                {
                    Name: "Shaoxing",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 614
                },
                {
                    Name: "Shenyang",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 443
                },
                {
                    Name: "Shenzhen",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 474
                },
                {
                    Name: "Singapore",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 353
                },
                {
                    Name: "Suzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 444
                },
                {
                    Name: "Sydney",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 358
                },
                {
                    Name: "Taipei",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 380
                },
                {
                    Name: "Taizhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 642
                },
                {
                    Name: "Tianjin",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 445
                },
                {
                    Name: "Tokyo Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 355,
                    Children: [
                        {
                            Name: "Tokyo Markets",
                            Children: [
                                {
                                    Name: "Chiba",
                                    Type: NodeUtils.Constants.Geography.Types.Metro,
                                    Id: 841,

                                },
                                {
                                    Name: "Chiyoda",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 799
                                },
                                {
                                    Name: "Chuo",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 801
                                },
                                {
                                    Name: "Minato",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 800
                                },
                                {
                                    Name: "Saitama",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 840
                                },
                                {
                                    Name: "Shibuya",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 1436
                                },
                                {
                                    Name: "Shinagawa",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 1437
                                },
                                {
                                    Name: "Tokyo",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 395
                                },
                                {
                                    Name: "Tokyo - Proper",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 1278
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Wenzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 616
                },
                {
                    Name: "Wuhan",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 446
                },
                {
                    Name: "Wuxi",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 643
                },
                {
                    Name: "Xiamen",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 476
                },
                {
                    Name: "Xuzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 612
                },
                {
                    Name: "Yancheng",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 644
                },
                {
                    Name: "Yangzhou",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 615
                },
                {
                    Name: "Zhenjiang",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 617
                },

            ],

        },
        {
            Name: "EMEA",
            Id: 2,
            Type: NodeUtils.Constants.Geography.Types.RCAZone,
            Theatres: [
                {
                    Name: "EMEA",
                    Type: NodeUtils.Constants.Geography.Types.RCAZone,
                    Id: 2
                },
                {
                    Name: "Europe",
                    Type: NodeUtils.Constants.Geography.Types.Continent,
                    Id: 2
                },
                {
                    Name: "Eurozone",
                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                    Id: 1
                },
                {
                    Name: "Nordics",
                    Type: NodeUtils.Constants.Geography.Types.RCASubTheatre,
                    Id: 3
                },
                {
                    Name: "AustriaSwitz",
                    Type: NodeUtils.Constants.Geography.Types.RCASubTheatre,
                    Id: 13
                },
                {
                    Name: "Benelux",
                    Type: NodeUtils.Constants.Geography.Types.RCASubTheatre,
                    Id: 6
                },
                {
                    Name: "Peripherals",
                    Type: NodeUtils.Constants.Geography.Types.RCASubTheatre,
                    Id: 12
                },
                {
                    Name: "CEE",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 6
                },
                {
                    Name: "Central Europe",
                    Type: NodeUtils.Constants.Geography.Types.RCASubTheatre,
                    Id: 7
                },
                {
                    Name: "Eastern Europe",
                    Type: NodeUtils.Constants.Geography.Types.RCASubTheatre,
                    Id: 10
                },
                {
                    Name: "Western Europe",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 13
                },
                {
                    Name: "Mid-East",
                    Type: NodeUtils.Constants.Geography.Types.Continent,
                    Id: 7
                },
                {
                    Name: "Africa",
                    Type: NodeUtils.Constants.Geography.Types.Continent,
                    Id: 4
                },

            ],
            Countries: [
                {
                    Name: "Austria",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 16
                },
                {
                    Name: "Azerbaijan",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 17
                },
                {
                    Name: "Bahrain",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 19
                },
                {
                    Name: "Belgium",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 23
                },
                {
                    Name: "Bulgaria",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 35
                },
                {
                    Name: "Croatia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 56
                },
                {
                    Name: "Czech Republic",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 59
                },
                {
                    Name: "Denmark",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 60
                },
                {
                    Name: "Egypt",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 65
                },
                {
                    Name: "Estonia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 69
                },
                {
                    Name: "Finland",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 74
                },
                {
                    Name: "France",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 75
                },
                {
                    Name: "Germany",
                    Id: 82,
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Children: [
                        {
                            Name: "German Market Tiers",
                            Children: [
                                {
                                    Name: "German A Cities",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 6
                                },
                                {
                                    Name: "Rest of Germany",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 26
                                }
                            ]
                        },
                        {
                            Name: "German Länder",
                            Children: [
                                {
                                    Name: "Baden-Württemberg",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 495
                                },
                                {
                                    Name: "Bavaria",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 228
                                },
                                {
                                    Name: "Berlin",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 236
                                },
                                {
                                    Name: "Brandenburg",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 472
                                },
                                {
                                    Name: "Bremen",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2465
                                },
                                {
                                    Name: "Hamburg",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3618
                                },
                                {
                                    Name: "Hesse",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2818
                                },
                                {
                                    Name: "Lower Saxony",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 1708
                                },
                                {
                                    Name: "North Rhine-Westphalia",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3784
                                },
                                {
                                    Name: "Rhineland-Palatinate",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3268
                                },
                                {
                                    Name: "Saxony ",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2466
                                },
                                {
                                    Name: "Saxony-Anhalt",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 2839
                                },
                                {
                                    Name: "Schleswig-Holstein",
                                    Type: NodeUtils.Constants.Geography.Types.StateProv,
                                    Id: 3330
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Greece",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 85
                },
                {
                    Name: "Hungary",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 100
                },
                {
                    Name: "Iceland",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 101
                },
                {
                    Name: "Ireland",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 106
                },
                {
                    Name: "Israel",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 108
                },
                {
                    Name: "Italy",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 109
                },
                {
                    Name: "Kuwait",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 119
                },
                {
                    Name: "Luxembourg",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 129
                },
                {
                    Name: "Madagascar",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 132
                },
                {
                    Name: "Morocco",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 150
                },
                {
                    Name: "Netherlands",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 156
                },
                {
                    Name: "Norway",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 166
                },
                {
                    Name: "Oman",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 167
                },
                {
                    Name: "Poland",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 177
                },
                {
                    Name: "Portugal",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 178
                },
                {
                    Name: "Qatar",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 180
                },
                {
                    Name: "Romania",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 182
                },
                {
                    Name: "Russia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 183
                },
                {
                    Name: "Saudi Arabia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 193
                },
                {
                    Name: "Serbia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 195
                },
                {
                    Name: "Slovakia",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 199
                },
                {
                    Name: "South Africa",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 203
                },
                {
                    Name: "Spain",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 205
                },
                {
                    Name: "Sweden",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 211
                },
                {
                    Name: "Switzerland",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 212
                },
                {
                    Name: "Turkey",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 224
                },
                {
                    Name: "Ukraine",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 229
                },
                {
                    Name: "United Arab Emirates",
                    Type: NodeUtils.Constants.Geography.Types.Country,
                    Id: 230
                },
                {
                    Name: "United Kingdom",
                    Type: NodeUtils.Constants.Geography.Types.RCATheatre,
                    Id: 12,
                    Children: [
                        {
                            Name: "RCA UK Regions",
                            Children: [
                                {
                                    Name: "Birmingham/Midlands",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 260
                                },
                                {
                                    Name: "East of England",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 251
                                },
                                {
                                    Name: "Greater London",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 252
                                },
                                {
                                    Name: "Manchester/NW",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 254
                                },
                                {
                                    Name: "Northern Ireland",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 255
                                },
                                {
                                    Name: "Scotland",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 256
                                },
                                {
                                    Name: "South East England",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 257
                                },
                                {
                                    Name: "South West England",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 258
                                },
                                {
                                    Name: "Wales",
                                    Type: NodeUtils.Constants.Geography.Types.Region,
                                    Id: 259
                                },
                                {
                                    Name: "Yorkshire/NE England",
                                    Type: NodeUtils.Constants.Geography.Types.Metro,
                                    Id: 261
                                }
                            ]
                        },
                        {
                            Name: "UK Market Tiers",
                            Children: [
                                {
                                    Name: "London Metro",
                                    Type: NodeUtils.Constants.Geography.Types.Metro,
                                    Id: 343
                                },
                                {
                                    Name: "Big Six",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 11
                                },
                                {
                                    Name: "Rest of UK",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 12
                                }
                            ]
                        }
                    ]
                },

            ],
            MetrosAndMarkets: [
                {
                    Name: "Amsterdam Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 345,
                    Children: [
                        {
                            Name: "Amsterdam Markets",
                            Children: [
                                {
                                    Name: "Amsterdam",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 346
                                },
                                {
                                    Name: "Rotterdam",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 347
                                },
                                {
                                    Name: "The Hague",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 348
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Barcelona",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 425
                },
                {
                    Name: "Berlin-Brandenburg",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 368
                },
                {
                    Name: "Birmingham",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 373
                },
                {
                    Name: "Bremen",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 449
                },
                {
                    Name: "Bristol",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 550
                },
                {
                    Name: "Brussels",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 390
                },
                {
                    Name: "Bucharest",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 384
                },
                {
                    Name: "Budapest",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 404
                },
                {
                    Name: "Cardiff",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 565
                },
                {
                    Name: "Copenhagen",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 372
                },
                {
                    Name: "Dubai",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 458
                },
                {
                    Name: "Dublin",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 379
                },
                {
                    Name: "Edinburgh",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 383
                },
                {
                    Name: "Frankfurt/Rhine-Main",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 357
                },
                {
                    Name: "Glasgow",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 382
                },
                {
                    Name: "Gothenburg",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 478
                },
                {
                    Name: "Hamburg",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 391
                },
                {
                    Name: "Hanover",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 482
                },
                {
                    Name: "Helsinki",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 401
                },
                {
                    Name: "Istanbul",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 378
                },
                {
                    Name: "Johannesburg",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 471
                },
                {
                    Name: "Leeds",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 432
                },
                {
                    Name: "Lisbon",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 420
                },
                {
                    Name: "Liverpool",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 557
                },
                {
                    Name: "London Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 343,
                    Children: [
                        {
                            Name: "London Markets",
                            Children: [
                                {
                                    Name: "Canary Wharf",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 823
                                },
                                {
                                    Name: "Central London",
                                    Type: NodeUtils.Constants.Geography.Types.MarketTier,
                                    Id: 21
                                },
                                {
                                    Name: "City of London",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 815
                                },
                                {
                                    Name: "West End",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 787
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Lyon",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 402
                },
                {
                    Name: "Madrid",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 377
                },
                {
                    Name: "Malmö",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 479
                },
                {
                    Name: "Manchester Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 433
                },
                {
                    Name: "Milan",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 411
                },
                {
                    Name: "Milton Keynes",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 631
                },
                {
                    Name: "Moscow",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 364
                },
                {
                    Name: "Munich",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 369
                },
                {
                    Name: "Newcastle",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 559
                },
                {
                    Name: "Nottingham",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 629
                },
                {
                    Name: "Nuremberg",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 662
                },
                {
                    Name: "Oslo",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 418
                },
                {
                    Name: "Paris",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 354,
                    Children: [
                        {
                            Name: "Paris Markets",
                            Children: [
                                {
                                    Name: "Rest of Paris",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 1474
                                },
                                {
                                    Name: "Paris - City Center",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 814
                                },
                                {
                                    Name: "La Defense",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 822
                                },
                                {
                                    Name: "Rest of Ile de France",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 664
                                },
                                {
                                    Name: "Western Crescent",
                                    Type: NodeUtils.Constants.Geography.Types.SubMarket,
                                    Id: 1641
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Prague",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 376
                },
                {
                    Name: "Reading",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 630
                },
                {
                    Name: "Rhine-Ruhr Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 664,
                    Children: [
                        {
                            Name: "Rhine-Ruhr Markets",
                            Children: [
                                {
                                    Name: "Cologne",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 469
                                },
                                {
                                    Name: "Dusseldorf",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 464
                                },
                                {
                                    Name: "Ruhr Valley",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 931
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Rome",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 412
                },
                {
                    Name: "Saint Petersburg",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 422
                },
                {
                    Name: "Saxon Triangle Metro",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 660,
                    Children: [
                        {
                            Name: "Saxon Triangle Markets",
                            Children: [
                                {
                                    Name: "Dresden",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 825
                                },
                                {
                                    Name: "Leipzig",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 506
                                },
                                {
                                    Name: "Saxon Triangle",
                                    Type: NodeUtils.Constants.Geography.Types.Market,
                                    Id: 926
                                }
                            ]
                        }
                    ]
                },
                {
                    Name: "Sheffield",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 602
                },
                {
                    Name: "Southampton",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 558
                },
                {
                    Name: "Stockholm",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 363
                },
                {
                    Name: "Stuttgart",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 448
                },
                {
                    Name: "Tel Aviv",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 409
                },
                {
                    Name: "Vienna",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 435
                },
                {
                    Name: "Warsaw",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 385
                },
                {
                    Name: "Zurich",
                    Type: NodeUtils.Constants.Geography.Types.Metro,
                    Id: 581
                },
            ],
        }
    ];
    public GeographyFilterSets: GeographyFilterSet[];

    public savedShapes: IShapeListItem[] = [];

    constructor(private $log: ng.ILogService, private $scope: IGeographyFilterScope, private $rootScope: ng.IRootScopeService, private customShapeService: CustomShapeService) {
        this.$log = $log.getInstance("Shared.GeographyFilterWidget.GeographyFilterController");

        this.BuildGeographyFilterSets();

        $scope.$on(GeographyFilterItemController.ValueChangedEvent, ()=> {
            this.CalculateGeographyFilterValue();
        });

        this.$log.debug("Constructed", this);

        this.customShapeService.getShapes().then((results)=>{
            this.savedShapes = results;
        });

        //todo: $scope.on saveShape event, GetGeoShapes(). and on delete shape event.
        this.$rootScope.$on(CustomShapeService.shapeSavedEvent, (angularEvent: ng.IAngularEvent, savedShape: ISavedShape)=>{
            this.customShapeService.getShapes().then((results)=>{
                this.savedShapes = results;
            });
        });
    }

    private BuildGeographyFilterSets(): void {
        var buildGeographyFilterItem = (geographyItem: IGeographyFilterItemDescription): NodeUtils.PropertySearch.Filters.Geography.GeographyFilter => {
            var children = _.map(geographyItem.Children, (n: IGeographyFilterItemDescription) => {
                return buildGeographyFilterItem(n);
            });

            return new NodeUtils.PropertySearch.Filters.Geography.GeographyFilter(geographyItem.Name, geographyItem.Id, geographyItem.Type, children);
        };

        var buildGeographyFilterSet = (geographyItem: IGeographyFilterSetDescription)=> {
            var theatres = _.map(geographyItem.Theatres, (n: IGeographyFilterItemDescription) => {
                return buildGeographyFilterItem(n);
            });

            var countries = _.map(geographyItem.Countries, (n: IGeographyFilterItemDescription) => {
                return buildGeographyFilterItem(n);
            });

            var metrosAndMarkets = _.map(geographyItem.MetrosAndMarkets, (n: IGeographyFilterItemDescription) => {
                return buildGeographyFilterItem(n);
            });

            return new GeographyFilterSet(geographyItem.Name, geographyItem.Id, theatres, countries, metrosAndMarkets);
        };

        this.GeographyFilterSets = _.map(GeographyFilterController.GeographyData, (n: IGeographyFilterSetDescription) => {
            return buildGeographyFilterSet(n);
        });
    }

    private FilterGeogrphyFilterItemsWithoutValueSet(items: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]): NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[] {
        var filterItemsWithoutValueSet = function (geogFilterItem: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter) {
            return geogFilterItem.Value != null || geogFilterItem.ChildHasValueSet();
        };

        return _.filter(items, filterItemsWithoutValueSet);
    }

    private FilterGeographyFilterSetItems(theatres: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[], countries: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[], metrosAndMarkets: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]) {
        var excludeSplitFunction = function (geogFilterItem: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter) {
            return geogFilterItem.Value === false;
        };

        var includeSplitFunction = function (geogFilterItem: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter) {
            return geogFilterItem.Value === true;
        };

        var theatresSplit: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[][] = _.partition(theatres, excludeSplitFunction);
        var countriesSplit: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[][] = _.partition(countries, excludeSplitFunction);
        var metrosAndMarketsSplit: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[][] = _.partition(metrosAndMarkets, excludeSplitFunction);

        var exclude: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[] = _.flatten([theatresSplit[0], countriesSplit[0], metrosAndMarketsSplit[0]]);
        var include: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[] = _.filter(_.flatten([theatresSplit[1], countriesSplit[1], metrosAndMarketsSplit[1]]), includeSplitFunction);

        var getGeographyItemChildren = function (item: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter) {
            return item.Children;
        };

        var childTheatres = _.flatten(_.map(theatresSplit[1], getGeographyItemChildren));
        var childCountries = _.flatten(_.map(countriesSplit[1], getGeographyItemChildren));
        var childMetrosAndMarkets = _.flatten(_.map(metrosAndMarketsSplit[1], getGeographyItemChildren));

        if (childTheatres.length > 0 || childCountries.length > 0 || childMetrosAndMarkets.length > 0) {
            var child = this.FilterGeographyFilterSetItems(childTheatres, childCountries, childMetrosAndMarkets);
            if (child != null) {
                exclude = _.flatten([exclude, child.exclude]);
                include = _.flatten([include, child.include]);
            }
        }

        if (include.length > 0 || exclude.length > 0) {
            return {include: include, exclude: exclude};
        }
        else {
            return null;
        }
    }

    private CalculateGeographyFilterValue(): void {
        var theatres: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[] = [];
        var countries: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[] = [];
        var metrosAndMarkets: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[] = [];

        _.forEach(this.GeographyFilterSets, function (geoFilterSet: GeographyFilterSet) {
            theatres = _.flatten([theatres, geoFilterSet.Theatres]);
            countries = _.flatten([countries, geoFilterSet.Countries]);
            metrosAndMarkets = _.flatten([metrosAndMarkets, geoFilterSet.MetrosAndMarkets]);
        });

        theatres = this.FilterGeogrphyFilterItemsWithoutValueSet(theatres);
        countries = this.FilterGeogrphyFilterItemsWithoutValueSet(countries);
        metrosAndMarkets = this.FilterGeogrphyFilterItemsWithoutValueSet(metrosAndMarkets);

        var getIndexNameFromType = function (type: NodeUtils.Constants.Geography.Types) {
            switch (type) {
                case NodeUtils.Constants.Geography.Types.Continent:
                    return "continent";

                case NodeUtils.Constants.Geography.Types.Country:
                    return "country";

                case NodeUtils.Constants.Geography.Types.County:
                    return "county";

                case NodeUtils.Constants.Geography.Types.Market:
                    return "market";

                case NodeUtils.Constants.Geography.Types.MarketTier:
                    return "markettier";

                case NodeUtils.Constants.Geography.Types.Metro:
                    return "metro";

                case NodeUtils.Constants.Geography.Types.PostalCode:
                    return "postalcode";

                case NodeUtils.Constants.Geography.Types.RCASubTheatre:
                    return "subtheatre";

                case NodeUtils.Constants.Geography.Types.RCATheatre:
                    return "theatre";

                case NodeUtils.Constants.Geography.Types.RCAZone:
                    return "zone";

                case NodeUtils.Constants.Geography.Types.StateProv:
                    return "stateprov";

                case NodeUtils.Constants.Geography.Types.SubMarket:
                    return "submarket";

                default:
                    throw "Unkown Type";
            }
        };

        var geographyFilter = this.FilterGeographyFilterSetItems(theatres, countries, metrosAndMarkets);
        var includes = geographyFilter.include.length > 0 ? geographyFilter.include : null;
        var excludes = geographyFilter.exclude.length > 0 ? geographyFilter.exclude : null;

        var geographyFilterValues = {include: includes, exclude: excludes};

        this.$log.debug("CalculateGeographyFilterValue", geographyFilterValues);

        this.$scope.setGeographyFilters(geographyFilterValues);
    }

    public fetchShape(id: number): void{
        this.customShapeService.getShape(id).then((result: ISavedShape)=>{
            this.$rootScope.$emit(GeographyFilterController.shapeRetrievedEvent, result);
        });
    }

    public deleteShape(input: number): void{
        this.customShapeService.deleteShape(input).then((response)=>{
            this.customShapeService.getShapes().then((results)=> {
                this.savedShapes = results;
            });
        });
    }
}

export = GeographyFilterController;
