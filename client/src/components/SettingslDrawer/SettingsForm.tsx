import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTickersList, getAllTickers } from '@/features/tickers/tickerSlice';
import { useEffect, useMemo } from 'react';
import { changeIntervalWatcher, filterTickersWatcher } from '@/api/webSocket';
import { getTickersFromApiSelector } from '@/features/tickers/tickerSelectors';
import { ITickerItemForCheckbox } from '@/types/dataTypes';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  interval: z.number().int().min(0).max(60000),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one ticker.',
  }),
});

type TSettingsFormProps = {
  defaultValue?: number;
  storageKey?: string;
};

const SettingsForm = ({
  defaultValue = 1000,
  storageKey = 'interval_refresh',
}: TSettingsFormProps) => {
  const items = useAppSelector(fetchTickersList);
  const defaultItems = useAppSelector(getTickersFromApiSelector) || [];
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interval:
        (localStorage.getItem(storageKey) &&
          parseInt(localStorage.getItem(storageKey) as string)) ||
        defaultValue,
      items: defaultItems.map((item) => item.ticker),
    },
  });

  const itemsList = useMemo(() => {
    return items.map(
      (ticker): ITickerItemForCheckbox => ({
        id: ticker,
        label: ticker,
      })
    );
  }, [items]);

  useEffect(() => {
    dispatch(getAllTickers());
  }, [dispatch]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    filterTickersWatcher(data.items);

    const interval = data.interval;
    if (interval >= 0) {
      localStorage.setItem(storageKey, String(interval));
      changeIntervalWatcher(interval);
    }

    toast({
      description: 'Changes have changed successfully',
    });
  }

  return (
    <Form {...form}>
      <form id='settings-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='interval'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval of quotes update, (ms)</FormLabel>
              <FormControl>
                <Input
                  type={'number'}
                  inputMode='numeric' // display numeric keyboard on mobile
                  pattern='[0-9]*' // to receive only numbers without showing does weird arrows in the input
                  min={0}
                  step={50}
                  placeholder={'1000, ms'}
                  {...field}
                  onChange={(event) => {
                    if (event.target.value) {
                      field.onChange(parseInt(event.target.value));
                    } else {
                      field.onChange(0);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>1000 ms equals 1 sec.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Tickers list</FormLabel>
                <FormDescription>
                  Select the tickers you want to display in the main list.
                </FormDescription>
              </div>
              {itemsList.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='items'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SettingsForm;
