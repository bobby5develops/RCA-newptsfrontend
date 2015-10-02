'use strict';

/**
 * Based on the Google Map Multipolygon. Our system appears not to call out the differences between a polygon and
 * a multi-polygon so at this time we'll default to all multi. There may be performance benefits to using more
 * simple polygons so it may be worth exploring it at a later time.
 */
export default class MapMultiPolygon {
    public type = "MultiPolygon";
    public coordinates:number[][][][];

    constructor(coords:number[][][]) {
        this.coordinates = [coords]
    }
}