import NodeUtils = require('cd-node-utils');

class GeographyFilterSet extends NodeUtils.PropertySearch.Filters.Geography.GeographyParentFilter {
    constructor(public Name: string,
                public Id: number,
                public Theatres: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[],
                public Countries: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[],
                public MetrosAndMarkets: NodeUtils.PropertySearch.Filters.Geography.GeographyFilter[]) {
        super();

        for (var i = 0; i < this.Theatres.length; i++) {
            this.Theatres[i].Parent = this;
        }

        for (var i = 0; i < this.Countries.length; i++) {
            this.Countries[i].Parent = this;
        }

        for (var i = 0; i < this.MetrosAndMarkets.length; i++) {
            this.MetrosAndMarkets[i].Parent = this;
        }
    }
}

export = GeographyFilterSet;
