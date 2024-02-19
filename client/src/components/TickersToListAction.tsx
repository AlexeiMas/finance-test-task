import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import TickersTable from '@/components/TickersTable/TickersTable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useGetTickersQueryEnhanced } from '@/hooks/useGetTickersQueryEnhanced';

interface ITickersToListActionProps {
  tickersList: string[];
  listKey?: string;
}

const TickersToListAction = ({ tickersList, listKey }: ITickersToListActionProps) => {
  const { currentListExpanded, isLoading } = useGetTickersQueryEnhanced(
    tickersList,
    (quote) => !tickersList?.includes(quote.ticker)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            buttonVariants({
              variant: 'ghost',
              class: 'text-sky-600 dark:text-sky-400 mt-4 w-fit mx-auto',
            })
          )}
        >
          <Plus className='w-5 h-5 mr-1' />
          Add new tickers
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center'>Tickers list</DialogTitle>
          <DialogDescription className='text-center'>
            You can add tickers to current list
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='w-full'>
          {isLoading && 'Loading...'}
          {currentListExpanded.length ? (
            <TickersTable
              data={currentListExpanded}
              excludedColumns={['change']}
              isInListIndicator={false}
              listKey={listKey}
            />
          ) : (
            <p className='text-center text-green-800'>All tickers are already added to list</p>
          )}
          <ScrollBar orientation='horizontal' />
        </ScrollArea>

        <DialogFooter className='sm:justify-center'>
          <DialogClose asChild>
            <Button type='button' variant='ghost'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TickersToListAction;
