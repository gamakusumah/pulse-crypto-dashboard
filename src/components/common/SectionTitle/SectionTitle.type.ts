import type { ReactNode } from 'react';

export interface SectionTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}
