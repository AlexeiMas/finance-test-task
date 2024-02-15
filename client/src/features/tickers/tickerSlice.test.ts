import { ITickerState, tickerSlice } from '@/features/tickers/tickerSlice';

const initialState: ITickerState = {
  explicitTickers: [],
  tickersList: [],
};

describe('tickerSlice', () => {
  it('should return the initial state', () => {
    expect(tickerSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle getAllTickers.fulfilled', () => {
    const tickers = [
      {
        ticker: 'BTCUSD',
        price: '50000',
        change: '100',
        yield: '0.5',
        dividend: '0.05',
        exchange: 'Gemini',
        change_percent: '0.2',
        last_trade_time: new Date(),
      },
      {
        ticker: 'ETHUSD',
        price: '3000',
        change: '50',
        yield: '0.15',
        dividend: '0.05',
        exchange: 'Coinbase',
        change_percent: '0.15',
        last_trade_time: new Date(),
      },
    ];
    const action = {
      type: 'quotes/getList/fulfilled',
      payload: tickers,
    };
    const expectedState = {
      explicitTickers: [],
      tickersList: tickers,
    };
    expect(tickerSlice.reducer(initialState, action)).toEqual(expectedState);
  });
});
