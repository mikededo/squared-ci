import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { DataDraggable } from '@/sd';

type Variant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

const RowVariants: Record<Variant, string> = {
  xs: 'gap-x-0.5',
  sm: 'gap-x-1',
  md: 'gap-x-2',
  lg: 'gap-x-3',
  xl: 'gap-x-4',
};
const RowJustify: Record<Justify, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

type Props = {
  variant?: Variant;
  justify?: Justify;
  className?: string;
} & DataDraggable;

export const Row: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  justify = 'start',
  variant = 'sm',
}) => (
  <div
    className={twMerge(
      'flex flex-row',
      RowVariants[variant],
      RowJustify[justify],
      className
    )}
  >
    {children}
  </div>
);
