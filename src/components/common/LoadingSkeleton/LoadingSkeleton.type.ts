export type LoadingSkeletonVariant = 'card' | 'row' | 'stat' | 'text';

export interface LoadingSkeletonProps {
  variant?: LoadingSkeletonVariant;
  count?: number;
  className?: string;
}
