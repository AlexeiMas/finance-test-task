import Routes from '@/routes';
import { ThemeProvider } from '@/components/ThemeMode/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
