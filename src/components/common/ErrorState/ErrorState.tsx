import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ErrorStateProps } from './ErrorState.type';

/**
 * Reusable failure state with a mandatory-by-convention retry action.
 * Every data section on the Home Page wires its query's `refetch`
 * into `onRetry` so a transient network error never dead-ends the UI.
 */
export function ErrorState({ title, description, onRetry, className }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-10 text-center',
        className,
      )}
    >
      <AlertTriangle className="h-6 w-6 text-danger" aria-hidden="true" />
      <p className="text-sm font-medium text-foreground">{title ?? t('errorState.defaultTitle')}</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        {description ?? t('errorState.defaultDescription')}
      </p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          {t('common.retry')}
        </Button>
      ) : null}
    </div>
  );
}
