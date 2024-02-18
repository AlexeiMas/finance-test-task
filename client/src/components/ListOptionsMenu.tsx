import { reservedListKey } from '@/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { removeList } from '@/features/lists/listsSlice';
import { ERoutes } from '@/routes/routes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface IListOptionsMenuProps {
  decodedName: string;
}

const ListOptionsMenu = ({ decodedName }: IListOptionsMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (decodedName.toLowerCase() === reservedListKey.toLowerCase()) {
    return null;
  }

  const onRemoveListHandler = () => {
    dispatch(removeList(decodedName));
    navigate(ERoutes.HomePage);
  };

  return (
    <div className='flex justify-end my-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <MoreVertical className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>List options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onRemoveListHandler} className='text-red-500'>
            Remove list
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ListOptionsMenu;
