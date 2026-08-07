import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.List>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      'relative flex flex-nowrap items-center gap-1 overflow-x-auto overscroll-x-contain scrollbar-hide border-b border-border',
      '[-webkit-overflow-scrolling:touch]',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';
