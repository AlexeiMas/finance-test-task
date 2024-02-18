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

interface ITickersTableMinimizedProps {
  quotes: string[];
  decodedName: string;
}

const TickersTableMinimized = ({ quotes, decodedName }: ITickersTableMinimizedProps) => {
  const dispatch = useDispatch();
  const onCloseHandler = (value: string) => {
    dispatch(filterTickersInList({ name: decodedName, value }));
  };

  return (
    <Table>
      <TableCaption>A table of quotes for current list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Ticker</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className='text-right'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!quotes.length && (
          <TableRow className='p-6 text-md text-center pointer-events-none'>
            <TableCell colSpan={3}>Empty list</TableCell>
          </TableRow>
        )}
        {quotes.map((quote) => (
          <TableRow key={quote}>
            <TableCell className='font-medium'>
              <Badge className='rounded-md w-20 justify-center'>{quote}</Badge>
            </TableCell>
            <TableCell className='font-medium'>{tickerTitlesMap.get(quote)}</TableCell>
            <TableCell className='text-right'>
              <Button variant='outline' size='icon' onClick={() => onCloseHandler(quote)}>
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
