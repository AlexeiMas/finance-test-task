import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { tickerTitlesMap } from '@/constants';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { filterTickersInList } from '@/features/lists/listsSlice';
import { useDispatch } from 'react-redux';
import { useGetTickersQuery } from '@/features/tickers/tickersApi';
import { useMemo } from 'react';
import { convertToCurrencyFormat } from '@/lib/utils';
import PercentChangeBadge from '@/components/TickersTable/PercentChangeBadge';

interface ITickersTableMinimizedProps {
  quotes: string[];
  decodedName: string;
}

const TickersTableMinimized = ({ quotes, decodedName }: ITickersTableMinimizedProps) => {
  const { data } = useGetTickersQuery(undefined, {
    skip: !quotes,
  });
  const dispatch = useDispatch();

  const filteredData = useMemo(() => {
    if (data) {
      return data.filter((quote) => quotes.includes(quote.ticker));
    }
    return [];
  }, [quotes, data]);

  const onCloseHandler = (value: string) => {
    dispatch(filterTickersInList({ name: decodedName, value }));
  };

  return (
    <Table className='mb-4'>
      <TableCaption>A table of quotes for current list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Ticker</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!quotes.length && (
          <TableRow className='p-6 text-md text-center pointer-events-none'>
            <TableCell colSpan={3}>Empty list</TableCell>
          </TableRow>
        )}
        {filteredData.map((quote) => (
          <TableRow key={quote.ticker}>
            <TableCell className='font-medium'>
              <Badge className='rounded-md w-20 justify-center'>{quote.ticker}</Badge>
            </TableCell>
            <TableCell className='font-medium'>{tickerTitlesMap.get(quote.ticker)}</TableCell>
            <TableCell className='last:text-right'>
              {convertToCurrencyFormat(quote.price)}
            </TableCell>
            <TableCell>
              <PercentChangeBadge changePercent={quote.change_percent} />
            </TableCell>
            <TableCell className='text-right'>
              <Button variant='outline' size='icon' onClick={() => onCloseHandler(quote.ticker)}>
                <X className='h-5 w-5' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TickersTableMinimized;
