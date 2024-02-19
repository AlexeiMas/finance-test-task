import { useGetTickersQuery } from '@/features/tickers/tickersApi';
import { useAppSelector } from '@/app/hooks';
import { getPreviousDataList } from '@/features/tickers/tickerSlice';
import { useMemo } from 'react';
import { IQuote, IQuoteWithSign } from '@/types/dataTypes';

interface IUseGetTickersQueryEnhanced {
  currentListExpanded: IQuoteWithSign[];
  isLoading: boolean;
}

export const useGetTickersQueryEnhanced = (
  quotes?: string[] | null,
  filterCb?: (quote: IQuote) => boolean
): IUseGetTickersQueryEnhanced => {
  const { filteredData, isLoading } = useGetTickersQuery(undefined, {
    skip: typeof quotes === 'undefined',
    selectFromResult: ({ data, isLoading }) => {
      if (data) {
        return {
          filteredData: filterCb ? data.filter(filterCb) : data,
          isLoading,
        };
      }
      return {
        filteredData: [],
        isLoading,
      };
    },
  });
  const { previousList } = useAppSelector(getPreviousDataList);

  const currentListExpanded = useMemo(() => {
    return filteredData.map((quote) => {
      const { change_percent } = previousList.find((item) => item.ticker === quote.ticker) || {
        change_percent: '0',
      };
      return {
        ...quote,
        signChange: Math.sign(parseFloat(quote.change_percent) - parseFloat(change_percent)),
      };
    });
  }, [previousList, filteredData]);

  return { currentListExpanded, isLoading };
};
