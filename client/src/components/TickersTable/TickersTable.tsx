import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import { IQuote } from '@/types/dataTypes';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, convertToCurrencyFormat } from '@/lib/utils';
import TickerActionBlock from '@/components/TickersTable/TickerActionBlock';
import { tickerTitlesMap } from '@/constants';

interface ITickersTableProps {
  data: IQuote[];
}

const TickersTable = ({ data }: ITickersTableProps) => {
  return (
    <Table>
      <TableCaption>A list of available quotes.</TableCaption>
      <TableBody>
        {data.map((quote) => (
          <TableRow key={quote.ticker} className='text-base'>
            <TableCell className='text-base font-medium'>
              <Badge className='justify-center rounded min-w-[60px] pointer-events-none'>
                {quote.ticker}
              </Badge>
            </TableCell>
            <TableCell>{tickerTitlesMap.get(quote.ticker)}</TableCell>
            <TableCell>{convertToCurrencyFormat(quote.price)}</TableCell>
            <TableCell>{convertToCurrencyFormat(quote.change)}</TableCell>
            <TableCell>
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
            <TableCell className='text-right'>
              <TickerActionBlock quote={quote} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TickersTable;
