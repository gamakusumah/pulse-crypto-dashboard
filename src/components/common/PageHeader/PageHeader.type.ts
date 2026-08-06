import type { ReactNode } from 'react';

export interface PageHeaderProps {
  logo: ReactNode;
  search?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
