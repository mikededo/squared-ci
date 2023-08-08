import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { DataDraggable } from '@/sd';

type Variant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const HColVariants: Record<Variant, string> = {
  xs: 'gap-x-0.5',
  sm: 'gap-x-1',
  md: 'gap-x-2',
  lg: 'gap-x-3',
  xl: 'gap-x-4',
};
const VColVariants: Record<Variant, string> = {
  xs: 'gap-y-0.5',
  sm: 'gap-y-1',
  md: 'gap-y-2',
  lg: 'gap-y-3',
  xl: 'gap-y-4',
};

type Props = { variant?: Variant; className?: string } & DataDraggable;

export const VCol = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ children, variant = 'sm', className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge('flex flex-col', VColVariants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
);

export const HCol = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ children, variant = 'sm', className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge('flex flex-row', HColVariants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
);
