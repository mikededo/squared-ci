import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/pulse';

type Variant = 'center' | 'left' | 'right';
type Props = {
  variant?: Variant;
  expand?: boolean;
  className?: string;
};

const JustifyVariants: Record<Variant, string> = {
  center: 'justify-center',
  left: 'justify-start',
  right: 'justify-end',
};

export const ChipWrapper: RequiredChildrenFC<Props> = ({
  children,
  className,
  expand = false,
  variant = 'center',
}) => (
  <div
    className={twMerge(
      'flex flex-wrap gap-1',
      JustifyVariants[variant],
      expand ? 'w-full' : 'mx-auto w-[280px]',
      className,
    )}
  >
    {children}
  </div>
);
