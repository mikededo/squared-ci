import type { ElementType, PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { DataDraggable } from '@/aero';

type Variant = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

const RowVariants: Record<Variant, string> = {
  none: 'gap-x-0',
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
const RowAlign: Record<Justify, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  between: 'items-between',
  around: 'items-around',
  evenly: 'items-evenly',
};

type Props = {
  variant?: Variant;
  justify?: Justify;
  align?: Justify;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
} & DataDraggable;

export const Row: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  style,
  justify = 'start',
  align = 'start',
  variant = 'sm',
  as: As = 'div',
}) => (
  <As
    className={twMerge(
      'flex flex-row',
      RowVariants[variant],
      RowJustify[justify],
      RowAlign[align],
      className,
    )}
    style={style}
  >
    {children}
  </As>
);
