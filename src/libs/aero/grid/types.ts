import type { PropsWithChildren } from 'react';

export type Gap =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | '10xl';
export type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColumnOffset = Exclude<Columns, 12>;
export type Direction = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type Responsive<T> = { sm?: T; md?: T; lg?: T; xl?: T };

export type CommonProps = {
  className?: string;
};
export type GridContainerProps = {
  container: true;
  size?: Exclude<Columns, 0>;
  gap?: Gap;
  colGap?: Gap;
  rowGap?: Gap;
  direction?: Direction;
  item?: never;
  columns?: never;
  offset?: never;
} & Responsive<never>;
export type GridItemProps = {
  container?: boolean; // An item can be both a container and an item
  item: true;
  columns?: Columns;
  offset?: ColumnOffset;
  size?: Exclude<Columns, 0>;
  gap?: Gap;
  colGap?: Gap;
  rowGap?: Gap;
  direction?: Direction;
} & Responsive<Columns>;
export type Props = PropsWithChildren<CommonProps> &
  (GridContainerProps | GridItemProps);
