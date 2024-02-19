import TickersTable from '@/components/TickersTable/TickersTable';
import ListsSection from '@/components/ListsSection/ListsSection';
import SettingsDrawer from '@/components/SettingslDrawer/SettingsDrawer';
import { useGetTickersQueryEnhanced } from '@/hooks/useGetTickersQueryEnhanced';

const HomePage = () => {
  const { currentListExpanded, isLoading } = useGetTickersQueryEnhanced(null);

  if (isLoading || !currentListExpanded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <div className='flex justify-end my-6'>
          <SettingsDrawer />
        </div>
        <TickersTable data={currentListExpanded} />
      </div>
      <ListsSection />
    </>
  );
};

export default HomePage;
