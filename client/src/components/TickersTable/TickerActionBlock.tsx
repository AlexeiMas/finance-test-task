import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlusCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { IQuote } from '@/types/dataTypes';
import { putTickerToList } from '@/features/lists/listsSlice';
import { useAppSelector } from '@/app/hooks';
import { useMemo } from 'react';
import TickerActionPopover from '@/components/TickersTable/TickerActionPopover';
import { reservedListKey } from '@/constants';

interface ITickerActionBlockProps {
  quote: IQuote;
}

const TickerActionBlock = ({ quote }: ITickerActionBlockProps) => {
  const { lists } = useAppSelector((state) => state.lists);
  const dispatch = useDispatch();

  const isInList = useMemo(() => {
    return Object.values(lists).flat().includes(quote.ticker);
  }, [lists]);

  const onAddAction = () => {
    if (!isInList) {
      dispatch(putTickerToList({ name: reservedListKey, value: quote.ticker }));
    }
  };

  if (isInList) {
    return <TickerActionPopover quote={quote} />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex justify-end cursor-pointer' onClick={onAddAction}>
            <PlusCircle className='hover:text-sky-500' />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Subscribe</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TickerActionBlock;
