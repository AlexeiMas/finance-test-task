import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const MainLayout = () => {
  return (
    <div className='flex flex-col h-dvh'>
      <Header />
      <main className='container max-w-screen-2xl flex-grow'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
