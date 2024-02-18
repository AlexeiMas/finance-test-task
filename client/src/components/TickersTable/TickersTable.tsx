import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import { IQuote } from '@/types/dataTypes';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, convertToCurrencyFormat } from '@/lib/utils';
import TickerActionBlock from '@/components/TickersTable/TickerActionBlock';
import { tickerTitlesMap } from '@/constants';
import { HTMLAttributes } from 'react';

interface ITickersTableProps extends HTMLAttributes<HTMLTableRowElement> {
  data: IQuote[];
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
    <Table>
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
                <Badge
                  className={cn(
                    'rounded space-x-0.5 pointer-events-none',
                    Math.sign(+quote.change_percent)
                      ? 'bg-badge-bg-success text-badge-text-success'
                      : 'bg-badge-bg-danger text-badge-text-danger'
                  )}
                >
                  {Math.sign(+quote.change_percent) ? (
                    <ArrowUp className='w-4 h-4' />
                  ) : (
                    <ArrowDown className='w-4 h-4' />
                  )}
                  <span className='text-base font-medium'>{quote.change_percent}&nbsp;%</span>
                </Badge>
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
