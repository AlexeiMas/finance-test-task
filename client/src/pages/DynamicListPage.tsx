import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { filterTickersInList, getListWithQuotes, removeList } from '@/features/lists/listsSlice';
import { useDispatch } from 'react-redux';
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
import { Button } from '@/components/ui/button';
import { MoreVertical, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ERoutes } from '@/routes/routes';
import { reservedListKey, tickerTitlesMap } from '@/constants';

const DynamicListPage = () => {
  const params = useParams<'name'>();
  const decodedName = decodeURI(params.name || '');
  const list = useAppSelector(getListWithQuotes);
  const quotes = list[decodedName];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseHandler = (value: string) => {
    dispatch(filterTickersInList({ name: decodedName, value }));
  };

  const onRemoveListHandler = () => {
    dispatch(removeList(decodedName));
    navigate(ERoutes.HomePage);
  };

  return (
    <div className='max-w-screen-md mx-auto'>
      {decodedName.toLowerCase() !== reservedListKey.toLowerCase() && (
        <div className='flex justify-end my-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <MoreVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>List options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onRemoveListHandler} className='text-red-500'>
                Remove list
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <h1 className='font-semibold text-2xl text-center my-8'>
        Detail info for <q>{decodedName}</q>
      </h1>

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
    </div>
  );
};

export default DynamicListPage;
