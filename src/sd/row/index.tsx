import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Variant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const RowVariants: Record<Variant, string> = {
  xs: 'gap-x-0.5',
  sm: 'gap-x-1',
  md: 'gap-x-2',
  lg: 'gap-x-3',
  xl: 'gap-x-4',
};

type Props = { variant?: Variant };

export const Row: React.FC<PropsWithChildren<Props>> = ({
  children,
  variant = 'sm',
}) => (
  <div className={classNames('flex flex-row', RowVariants[variant])}>
    {children}
  </div>
);
