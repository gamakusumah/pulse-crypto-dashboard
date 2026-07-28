import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  logo: ReactNode;
  search?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/**
 * Top-level app header. Deliberately narrow in responsibility: it
 * only arranges logo / search / actions slots, so the Home Page
 * layout stays free of navigation logic per the "no nav menu" brief.
 */
export function PageHeader({ logo, search, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur',
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-4 lg:px-6">
        <div className="shrink-0">{logo}</div>
        {search ? <div className="max-w-md flex-1">{search}</div> : <div className="flex-1" />}
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
