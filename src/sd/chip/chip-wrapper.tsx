import classNames from 'classnames';
import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

type Variant = 'center' | 'left' | 'right';
type Props = {
  variant?: Variant;
};

const JustifyVariants: Record<Variant, string> = {
  center: 'justify-center',
  left: 'justify-start',
  right: 'justify-end',
};

export const ChipWrapper: RequiredChildrenFC<Props> = ({
  children,
  variant = 'center',
}) => (
  <div
    className={classNames(
      'flex flex-wrap gap-1 mx-auto w-[280px]',
      JustifyVariants[variant]
    )}
  >
    {children}
  </div>
);
