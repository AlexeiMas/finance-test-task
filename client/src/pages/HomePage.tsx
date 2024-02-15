import TickersTable from '@/components/TickersTable/TickersTable';
import ListsSection from '@/components/ListsSection/ListsSection';
import { useGetTickersQuery } from '@/features/tickers/tickersApi';
import SettingsDrawer from '@/components/SettingslDrawer/SettingsDrawer';

const HomePage = () => {
  const { data, isLoading } = useGetTickersQuery();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <div className='flex justify-end my-6'>
          <SettingsDrawer />
        </div>
        <TickersTable data={data} />
      </div>
      <ListsSection />
    </>
  );
};

export default HomePage;
