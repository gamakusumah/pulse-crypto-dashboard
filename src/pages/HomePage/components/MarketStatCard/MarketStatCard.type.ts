import type { ReactNode } from 'react';

export interface MarketStatCardProps {
  label: string;
  value: string;
  change?: ReactNode;
  icon?: ReactNode;
  className?: string;
}
