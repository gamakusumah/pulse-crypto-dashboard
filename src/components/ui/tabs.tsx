import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

export const Tabs = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Root>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Root>
>((props, ref) => <BaseTabs.Root ref={ref} {...props} />);
Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.List>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      'relative flex items-center gap-1 overflow-x-auto scrollbar-thin border-b border-border',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export const TabsTab = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Tab>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(
      'shrink-0 whitespace-nowrap px-3 py-2 text-sm font-medium text-muted-foreground transition-colors',
      'hover:text-foreground',
      'data-[selected]:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-t-md',
      className,
    )}
    {...props}
  />
));
TabsTab.displayName = 'TabsTab';

export const TabsIndicator = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Indicator>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator>
>(({ className, ...props }, ref) => (
  <BaseTabs.Indicator
    ref={ref}
    className={cn(
      'absolute bottom-0 left-0 h-0.5 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] bg-accent transition-all duration-300 ease-out',
      className,
    )}
    {...props}
  />
));
TabsIndicator.displayName = 'TabsIndicator';

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
