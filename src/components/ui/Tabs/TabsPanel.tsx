import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

export const TabsPanel = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn(
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md',
      className,
    )}
    {...props}
  />
));
TabsPanel.displayName = 'TabsPanel';
