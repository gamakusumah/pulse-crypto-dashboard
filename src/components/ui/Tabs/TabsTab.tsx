import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

export const TabsTab = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Tab>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(
      'shrink-0 cursor-pointer whitespace-nowrap px-3 py-2 text-sm font-medium text-muted-foreground transition-colors',
      'hover:text-foreground',
      'data-[selected]:text-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-t-md',
      className,
    )}
    {...props}
  />
));
TabsTab.displayName = 'TabsTab';
