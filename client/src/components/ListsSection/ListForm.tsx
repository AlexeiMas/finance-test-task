import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/app/hooks';
import { addNewEmptyList } from '@/features/lists/listsSlice';

const FormSchema = z.object({
  listName: z.string().min(3, {
    message: 'List name must be at least 3 characters.',
  }),
});

const ListForm = () => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listName: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(addNewEmptyList(data.listName));
    toast({
      description: 'New list name was added to your collection.',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form id={'list-form'} onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='listName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>List name</FormLabel>
              <FormControl>
                <Input placeholder='ex, favorites' {...field} />
              </FormControl>
              <FormDescription>This is list public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ListForm;
