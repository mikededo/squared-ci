import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { DataDraggable } from '@/aero';

type Variant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

const HColVariants: Record<Variant, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-0.5',
  sm: 'gap-x-1',
  md: 'gap-x-2',
  lg: 'gap-x-3',
  xl: 'gap-x-4',
};
const VColVariants: Record<Variant, string> = {
  none: 'gap-x-0',
  xs: 'gap-y-0.5',
  sm: 'gap-y-1',
  md: 'gap-y-2',
  lg: 'gap-y-3',
  xl: 'gap-y-4',
};
const ColJustify: Record<Justify, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};
const ColAlign: Record<Justify, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  between: 'items-between',
  around: 'items-around',
  evenly: 'items-evenly',
};

type Props = {
  variant?: Variant;
  className?: string;
  justify?: Justify;
  align?: Justify;
  style?: React.CSSProperties;
  expand?: boolean;
} & DataDraggable;

export const VCol = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (
    {
      children,
      variant = 'sm',
      justify = 'start',
      align = 'start',
      className,
      expand,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={twMerge(
        'flex flex-col',
        VColVariants[variant],
        ColJustify[justify],
        ColAlign[align],
        expand && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

export const HCol = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (
    {
      children,
      variant = 'sm',
      justify = 'start',
      align = 'start',
      className,
      expand,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={twMerge(
        'flex flex-row',
        HColVariants[variant],
        ColJustify[justify],
        ColAlign[align],
        expand && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
