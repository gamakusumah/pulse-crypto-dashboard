import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * Reusable "nothing to show" state. Used whenever a query succeeds
 * but returns an empty list, distinct from `ErrorState` which is for
 * failures. `title`/`description` default to translated generic
 * copy but can be overridden per section with more specific text.
 */
export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-10 text-center',
        className,
      )}
    >
      <div className="text-muted-foreground">
        {icon ?? <Inbox className="h-6 w-6" aria-hidden="true" />}
      </div>
      <p className="text-sm font-medium text-foreground">{title ?? t('emptyState.defaultTitle')}</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        {description ?? t('emptyState.defaultDescription')}
      </p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
