import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import type { LoadingSkeletonProps, LoadingSkeletonVariant } from './LoadingSkeleton.type';

/**
 * Reusable skeleton generator. The Home Page brief requires every
 * section to show skeleton loading (never a spinner) — this component
 * centralizes the shapes so each section only picks a variant + count.
 */
export function LoadingSkeleton({ variant = 'card', count = 1, className }: LoadingSkeletonProps) {
  return (
    <div className={cn(variant === 'row' ? 'flex flex-col gap-2' : 'grid gap-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonShape key={index} variant={variant} />
      ))}
    </div>
  );
}

function SkeletonShape({ variant }: { variant: LoadingSkeletonVariant }) {
  if (variant === 'stat') {
    return (
      <div className="space-y-2 rounded-xl border border-border p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-28" />
      </div>
    );
  }

  if (variant === 'row') {
    return (
      <div className="flex items-center gap-3 rounded-lg px-2 py-2.5">
        <Skeleton className="h-7 w-7 rounded-full" />
        <Skeleton className="h-3 flex-1" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-12" />
      </div>
    );
  }

  if (variant === 'text') {
    return <Skeleton className="h-3 w-full" />;
  }

  return (
    <div className="space-y-3 rounded-xl border border-border p-4">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
}
