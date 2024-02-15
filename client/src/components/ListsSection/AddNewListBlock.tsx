import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ListForm from '@/components/ListsSection/ListForm';

const AddNewListBlock = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(buttonVariants({ variant: 'ghost', class: 'text-sky-600' }))}
        >
          <Plus className='w-5 h-5 mr-1' />
          Create new list
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create list</DialogTitle>
        </DialogHeader>

        <div>
          <ListForm />
        </div>

        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='ghost'>
              Close
            </Button>
          </DialogClose>
          <Button form={'list-form'}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewListBlock;
