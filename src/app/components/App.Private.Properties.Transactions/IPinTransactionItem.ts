interface IPinTransactionItem {
  PropertyId:number;
  DealId:number;
  PropertyKeyId:number;
  Latitude:number;
  Longitude:number;
  TransactionType:string;
  StatusDate:Date;
  PropertyType:string;
  PropertySubType:string;
  Market:string;
  Metro:string;
  PropertyName :string;
  Address: string;
  City :string;
  StateProv :string;
  Country :string;
  PostalCode: string;
  Units :number;
  StatusPrice :number;
  StatusPricePerUnit :number;
  StatusCapRate :number;
  BuyerSellerBrokerString :string;
  PropertyComments :string;
  DealComments :string;
  YearBuilt: string;
  CurrencySymbol: string;
  MeasurementSymbol: string;
  QScore: number;
}

export = IPinTransactionItem;
