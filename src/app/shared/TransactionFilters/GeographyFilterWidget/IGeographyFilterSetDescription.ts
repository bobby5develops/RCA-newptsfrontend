/// <reference path="../../../tsd.d.ts" />

import NodeUtils                        = require('cd-node-utils')
import IGeographyFilterItemDescription = require("./IGeographyFilterItemDescription");

interface IGeographyFilterSetDescription {
    Name: string;
    Id: number;
    Type: NodeUtils.Constants.Geography.Types,
    Theatres: IGeographyFilterItemDescription[];
    Countries: IGeographyFilterItemDescription[];
    MetrosAndMarkets: IGeographyFilterItemDescription[];
}

export = IGeographyFilterSetDescription;