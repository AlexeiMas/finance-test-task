import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { filterTickersInList, getEntriesLists, putTickerToList } from '@/features/lists/listsSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { ERoutes } from '@/routes/routes';
import { IQuote } from '@/types/dataTypes';
import { useDispatch } from 'react-redux';
import { CheckedState } from '@radix-ui/react-checkbox';

interface ITickerActionPopoverProps {
  quote: IQuote;
}

const TickerActionPopover = ({ quote }: ITickerActionPopoverProps) => {
  const listsData = useAppSelector(getEntriesLists);
  const dispatch = useDispatch();

  const onCheckedChangeHandler = (checked: CheckedState, name: string) => {
    if (checked) {
      dispatch(putTickerToList({ name, value: quote.ticker }));
    } else {
      dispatch(filterTickersInList({ name, value: quote.ticker }));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex justify-end cursor-pointer'>
          <CheckCircle2 className='bg-pink-600 text-white rounded-full' />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {listsData.map((list) => (
          <div key={list[0]} className='flex items-center space-x-2 hover:bg-muted p-2'>
            <Checkbox
              id={list[0]}
              checked={list[1].includes(quote.ticker)}
              onCheckedChange={(checked) => onCheckedChangeHandler(checked, list[0])}
            />
            <label
              htmlFor={list[0]}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {list[0]}
            </label>
            <div className='flex-1 text-end opacity-0 hover:opacity-100'>
              <Link
                to={`${ERoutes.DynamicPageBase}/${encodeURI(list[0])}`}
                className='text-sky-500'
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default TickerActionPopover;
