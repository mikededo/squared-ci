import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Grid } from '@/aero';

type Sides = 'x' | 'y' | 'all' | 'left' | 'right' | 'top' | 'bottom' | 'none';
type GridItemProps = Pick<
  Parameters<typeof Grid>[0],
  'offset' | 'columns' | 'sm' | 'md' | 'lg' | 'xl'
>;
type Props = {
  className?: string;
} & Partial<Record<Sides, boolean>> &
  GridItemProps;

const Borders: Record<Sides, string> = {
  x: 'border-x',
  y: 'border-y',
  all: 'border',
  left: 'border-l',
  right: 'border-r',
  top: 'border-t',
  bottom: 'border-b',
  none: 'border-none',
};

export const BorderedBox: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
  offset,
  columns,
  sm,
  md,
  lg,
  xl,
  ...props
}) => {
  const classes = twMerge(
    'border-dashed border-slate-300 w-full h-full',
    Object.keys(props).map((key) =>
      props[key as Sides] ? Borders[key as Sides] : null,
    ),
    className,
  );

  const anyGridProps = offset || columns || sm || md || lg || xl;
  if (anyGridProps) {
    const gridProps = { offset, columns, sm, md, lg, xl };
    return (
      <Grid item {...gridProps} className={classes}>
        {children}
      </Grid>
    );
  }

  return <div className={classes}>{children}</div>;
};
