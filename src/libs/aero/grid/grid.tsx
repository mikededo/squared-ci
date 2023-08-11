import React from 'react';
import { twMerge } from 'tailwind-merge';

import {
  ColGapClasses,
  ColumnOffsetClasses,
  ColumnSpanClasses,
  ColumnsClasses,
  DirectionClasses,
  GapClasses,
  LgColumnSpanClasses,
  MdColumnSpanClasses,
  RowGapClasses,
  SmColumnSpanClasses,
  XlColumnSpanClasses,
} from './classes';
import type { Props } from './types';

export const Grid = React.forwardRef<HTMLDivElement, Props>(
  ({ container, item, ...props }, ref) => {
    // If the grid type is not specified, we do not apply any styles
    if (!item && !container) {
      return <div ref={ref} {...props} />;
    }
    const { size, className, colGap, direction, gap, rowGap, ...itemRest } =
      props;
    const containerClasses = twMerge(
      'grid grid-cols-12',
      ColumnsClasses[size ?? 12],
      GapClasses[gap ?? 'none'],
      ColGapClasses[colGap ?? 'none'],
      RowGapClasses[rowGap ?? 'none'],
      DirectionClasses[direction ?? 'row'],
      className,
    );

    if (!item) {
      return <div ref={ref} className={containerClasses} {...itemRest} />;
    }

    const { columns, offset, sm, md, lg, xl, ...rest } = itemRest;

    const classes = twMerge(
      container && containerClasses,
      ColumnSpanClasses[columns ?? 12],
      sm && SmColumnSpanClasses[sm],
      md && MdColumnSpanClasses[md],
      lg && LgColumnSpanClasses[lg],
      xl && XlColumnSpanClasses[xl],
      offset && ColumnOffsetClasses[offset],
      className,
    );

    return <div ref={ref} className={classes} {...rest} />;
  },
);
