interface IBubbleTransactionItem {
  id: number;
  Longitude: number;
  Latitude: number;
  Name: string;
  NumberOfTransactions: number;
  SumOfStatusPrice: number;
  CurrencySymbol: string;
}

export = IBubbleTransactionItem;
