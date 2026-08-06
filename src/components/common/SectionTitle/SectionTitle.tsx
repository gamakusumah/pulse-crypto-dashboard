import { cn } from '@/lib/utils';
import type { SectionTitleProps } from './SectionTitle.type';

/**
 * Consistent heading used at the top of every Home Page section
 * (Trending, Categories, Coin Table, ...). Keeps heading level,
 * spacing, and optional trailing action uniform across the page.
 */
export function SectionTitle({ title, description, action, className }: SectionTitleProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h2>
        {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
