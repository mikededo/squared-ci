import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/editor/domain/shared';

type Variant = 'center' | 'left' | 'right';
type Props = {
  variant?: Variant;
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
  variant = 'center',
  
}) => (
  <div
    className={twMerge(
      'flex flex-wrap gap-1 mx-auto w-[280px]',
      JustifyVariants[variant],
        className
    )}
  >
    {children}
  </div>
);
