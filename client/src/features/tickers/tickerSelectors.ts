import { RootState } from '@/app/store';
import { IQuote } from '@/types/dataTypes';

export const getTickersFromApiSelector = (state: RootState) =>
  state.tickerApi.queries['getTickers(undefined)']?.data as IQuote[];
