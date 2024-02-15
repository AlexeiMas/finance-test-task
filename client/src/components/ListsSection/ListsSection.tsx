import { Link } from 'react-router-dom';
import { List } from 'lucide-react';
import { ERoutes } from '@/routes/routes';
import { useAppSelector } from '@/app/hooks';
import { getEntriesLists } from '@/features/lists/listsSlice';
import AddNewListBlock from '@/components/ListsSection/AddNewListBlock';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ListsSection = () => {
  const data = useAppSelector(getEntriesLists);

  return (
    <section className='p-4'>
      <h6 className='uppercase mb-4'>Your lists</h6>
      <ScrollArea className='w-full py-4'>
        <div className='flex items-center gap-x-4'>
          {data.map((list) => (
            <div
              key={list[0]}
              className='rounded border border-gray-300 hover:ring hover:ring-gray-200 w-fit'
            >
              <Link
                to={`${ERoutes.DynamicPageBase}/${encodeURI(list[0])}`}
                className='flex items-center p-2 space-x-2 cursor-pointer'
              >
                <span>
                  <List />
                </span>
                <span className='min-w-16 max-w-52 truncate capitalize'>{list[0]}</span>
                <div className='text-gray-500 pr-1'>{list[1].length}</div>
              </Link>
            </div>
          ))}
          <AddNewListBlock />
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
};

export default ListsSection;
