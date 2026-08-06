import type * as React from 'react';

export type BadgeVariant = 'default' | 'success' | 'danger' | 'accent' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}
