/// <reference path="../../tsd.d.ts" />

"use strict";

interface ISavedShape {
    createDate: Date;
    name: string;
    type: string;
    accountUserId?: number;
    radius?: number;
    center?: number[];
    northeast?: number[];
    southwest?: number[];
    points?: number[][];
}

export default ISavedShape;
