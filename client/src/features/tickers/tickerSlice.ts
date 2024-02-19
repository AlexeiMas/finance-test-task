import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  currentList: IQuote[];
  previousList: IQuote[];
}

const initialState: ITickerState = {
  explicitTickers: [],
  tickersList: [],
  currentList: [],
  previousList: [],
};

export const tickerSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    updateLists: (state, action: PayloadAction<IQuote[]>) => {
      state.previousList = state.currentList;
      state.currentList = action.payload;
    },
  },
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
    getPreviousDataList: (data: ITickerState) => ({ previousList: data.previousList }),
  },
});

export const { fetchTickersList, getPreviousDataList } = tickerSlice.selectors;

export const { updateLists } = tickerSlice.actions;
