import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import SettingsForm from '@/components/SettingslDrawer/SettingsForm';

const SettingsDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' size='icon'>
          <Settings className='h-4 w-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle className='text-left sm:text-center'>Configuration</DrawerTitle>
            <DrawerDescription className='text-left sm:text-center'>
              Set necessary parameters for application
            </DrawerDescription>
          </DrawerHeader>

          <div className='p-4 pb-2 space-y-6'>
            <SettingsForm />
          </div>

          <DrawerFooter>
            <Button form={'settings-form'}>Save</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
