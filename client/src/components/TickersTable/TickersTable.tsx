import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import { IQuote, IQuoteWithSign } from '@/types/dataTypes';
import { Badge } from '@/components/ui/badge';
import { convertToCurrencyFormat } from '@/lib/utils';
import TickerActionBlock from '@/components/TickersTable/TickerActionBlock';
import { tickerTitlesMap } from '@/constants';
import { HTMLAttributes } from 'react';
import PercentChangeBadge from '@/components/TickersTable/PercentChangeBadge';

interface ITickersTableProps extends HTMLAttributes<HTMLTableRowElement> {
  data: IQuoteWithSign[];
  excludedColumns?: (
    | keyof Pick<IQuote, 'price' | 'change' | 'change_percent'>
    | 'actionBtn'
    | 'title'
  )[];
  isInListIndicator?: boolean;
  listKey?: string;
}

const TickersTable = ({
  data,
  excludedColumns = [],
  isInListIndicator,
  listKey,
  ...rowsProps
}: ITickersTableProps) => {
  return (
    <Table className='mb-4'>
      <TableCaption>A list of available quotes.</TableCaption>
      <TableBody>
        {data.map((quote) => (
          <TableRow key={quote.ticker} className='text-base' {...rowsProps}>
            <TableCell className='text-base font-medium'>
              <Badge className='justify-center rounded min-w-[60px] pointer-events-none'>
                {quote.ticker}
              </Badge>
            </TableCell>
            {!excludedColumns?.includes('title') && (
              <TableCell>{tickerTitlesMap.get(quote.ticker)}</TableCell>
            )}
            {!excludedColumns?.includes('price') && (
              <TableCell className='last:text-right'>
                {convertToCurrencyFormat(quote.price)}
              </TableCell>
            )}
            {!excludedColumns?.includes('change') && (
              <TableCell className='last:text-right'>
                {convertToCurrencyFormat(quote.change)}
              </TableCell>
            )}
            {!excludedColumns?.includes('change_percent') && (
              <TableCell className='last:text-right'>
                <PercentChangeBadge changePercent={quote.change_percent} sign={quote.signChange} />
              </TableCell>
            )}
            {!excludedColumns?.includes('actionBtn') && (
              <TableCell className='text-right'>
                <TickerActionBlock
                  quote={quote}
                  isInListIndicator={isInListIndicator}
                  listKey={listKey}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TickersTable;
