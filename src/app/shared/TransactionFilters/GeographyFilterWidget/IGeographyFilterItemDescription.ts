/// <reference path="../../../tsd.d.ts" />

import NodeUtils = require('cd-node-utils');

interface IGeographyFilterItemDescription {
    Id ?: number;
    Name : string;
    Type ?: NodeUtils.Constants.Geography.Types;
    Children ?: IGeographyFilterItemDescription[];
}

export = IGeographyFilterItemDescription;
