import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTickerListener, removeTickerListener, startTickerWatcher } from '@/api/webSocket';
import { IQuote } from '@/types/dataTypes';
import { updateLists } from '@/features/tickers/tickerSlice';

export const tickersApi = createApi({
  reducerPath: 'tickerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => ({
    getTickers: builder.query<IQuote[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        startTickerWatcher();
        try {
          await cacheDataLoaded;
          const listener = (quotes: IQuote[]) => {
            if (!quotes) return;
            dispatch(updateLists(quotes));
            updateCachedData(() => {
              return quotes;
            });
          };

          addTickerListener(listener);
        } catch (e) {
          console.log(e);
        }
        await cacheEntryRemoved;

        removeTickerListener();
      },
    }),
  }),
});

export const { useGetTickersQuery } = tickersApi;
