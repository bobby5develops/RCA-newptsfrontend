import MapMultiPolygon from "./MapMultiPolygon";

'use strict';

export default class MapParcel {
    public fill = {color: '#008000', opacity: '0.0'};
    public stroke = { color: '#000000', weight: 1, opacity: '1.0' };
    public info = false;

    constructor(public id:number,
                public address: string,
                public ownername: string,
                public geometry: MapMultiPolygon) {
    }
    public toString() {
        return this.id + ' ' + this.geometry;
    }
}
