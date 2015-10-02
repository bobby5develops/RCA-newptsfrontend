interface IPropertyTypeFilterAggregation {
    key: string;
    count: number;
    subTypes: {[key:string]: number};
    features: {[key:string]: number};
}

export {IPropertyTypeFilterAggregation};
