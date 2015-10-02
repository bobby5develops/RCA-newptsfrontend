/// <reference path="../../../tsd.d.ts" />

interface IBroker {
    CompanyId: number;
    CompanyName: string;
    AcquisitionsVolume: number;
    DispositionsVolume: number;
    AcquisitionsPropertiesCount: number;
    DispositionsPropertiesCount: number;
    TotalVolume: number;
    TotalPropertiesCount: number;
}

export = IBroker;