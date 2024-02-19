import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PercentChangeBadge = ({ changePercent }: { changePercent: string }) => {
  return (
    <Badge
      className={cn(
        'rounded space-x-0.5 pointer-events-none',
        Math.sign(+changePercent)
          ? 'bg-badge-bg-success text-badge-text-success'
          : 'bg-badge-bg-danger text-badge-text-danger'
      )}
    >
      {Math.sign(+changePercent) ? (
        <ArrowUp className='w-4 h-4' />
      ) : (
        <ArrowDown className='w-4 h-4' />
      )}
      <span className='text-base font-medium'>{changePercent}&nbsp;%</span>
    </Badge>
  );
};

export default PercentChangeBadge;
