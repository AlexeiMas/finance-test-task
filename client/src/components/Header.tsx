import { Link } from 'react-router-dom';
import { ERoutes } from '@/routes/routes';
import { Home } from 'lucide-react';
import { ModeToggle } from '@/components/ThemeMode/ModeToggle';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <Link to={ERoutes.HomePage}>
          <Home />
        </Link>

        <div className='ml-auto'>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
