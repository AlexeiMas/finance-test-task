import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { addNewEmptyList, getListWithQuotes } from '@/features/lists/listsSlice';
import TickersTableMinimized from '@/components/TickersTable/TickersTableMinimized';
import ListOptionsMenu from '@/components/ListOptionsMenu';
import TickersToListAction from '@/components/TickersToListAction';
import EmptyAreaIcon from '@/assets/EmptyAreaIcon';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const DynamicListPage = () => {
  const params = useParams<'name'>();
  const decodedName = decodeURI(params.name || '');
  const list = useAppSelector(getListWithQuotes);
  const quotes = list[decodedName];
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof quotes === 'undefined') {
      dispatch(addNewEmptyList(decodedName));
    }
  }, []);

  return (
    <div className='max-w-screen-md flex flex-col mx-auto'>
      <ListOptionsMenu decodedName={decodedName} />

      <h1 className='font-semibold text-2xl text-center my-8'>
        Detail info for <q>{decodedName}</q>
      </h1>

      {!!quotes?.length ? (
        <TickersTableMinimized quotes={quotes} decodedName={decodedName} />
      ) : (
        <div className='mx-auto'>
          <EmptyAreaIcon />
        </div>
      )}
      <TickersToListAction tickersList={quotes} listKey={decodedName} />
    </div>
  );
};

export default DynamicListPage;
