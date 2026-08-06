import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';

export const Tabs = React.forwardRef<
  React.ComponentRef<typeof BaseTabs.Root>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Root>
>((props, ref) => <BaseTabs.Root ref={ref} {...props} />);
Tabs.displayName = 'Tabs';
