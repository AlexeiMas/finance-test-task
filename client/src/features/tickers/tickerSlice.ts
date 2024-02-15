import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tickersApi } from '@/features/tickers/tickersApi';
import { getAllTickersList } from '@/api/webSocket';
import { IQuote } from '@/types/dataTypes';

export const getAllTickers = createAsyncThunk('quotes/getList', async () => {
  const list = await getAllTickersList();
  return list;
});

export interface ITickerState {
  explicitTickers: IQuote[];
  tickersList: string[];
}

const initialState: ITickerState = {
  explicitTickers: [],
  tickersList: [],
};

export const tickerSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTickers.fulfilled, (state, action) => {
      state.tickersList = action.payload;
    });
    builder.addMatcher(tickersApi.endpoints?.getTickers.matchFulfilled, (state, action) => {
      state.explicitTickers = action.payload;
    });
  },
  selectors: {
    fetchTickersList: (data: ITickerState) => data.tickersList,
  },
});

export const { fetchTickersList } = tickerSlice.selectors;
