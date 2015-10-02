export interface IData {
    lollipops?:ILollipop[];
    lines?:ILine[];
}

export interface ILollipop {
    date : Date;
    type:string;
    price:number;
}

export interface ILine {
    name:string;
    data : IPoint[];
}
export interface IPoint {
    date:Date;
    ppu:number;
}

export interface IOptions {
    height ?:number
    width ?: number;
    margin ?: {
        top :number
        bottom : number;
        right : number;
        left : number;
    };
    lollipop ?: {
        radius : number;
    };
    legend ?: {
        width : number;
    }
    axes ?: {
        xLabel:string;
        yLabel:string;
    }
}
