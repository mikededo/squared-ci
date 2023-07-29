import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

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

type Props = { variant?: Variant };

export const VCol: React.FC<PropsWithChildren<Props>> = ({
  children,
  variant = 'sm',
}) => (
  <div className={classNames('flex flex-col', VColVariants[variant])}>
    {children}
  </div>
);

export const HCol: React.FC<PropsWithChildren<Props>> = ({
  children,
  variant = 'sm',
}) => (
  <div className={classNames('flex flex-col', HColVariants[variant])}>
    {children}
  </div>
);
