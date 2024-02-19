export interface IQuote {
  ticker: string;
  price: string;
  change: string;
  yield: string;
  dividend: string;
  exchange: string;
  change_percent: string;
  last_trade_time: Date;
}

export interface IQuoteWithSign extends IQuote {
  signChange: number;
}

export interface ITickerItemForCheckbox {
  id: string;
  label: string;
}
