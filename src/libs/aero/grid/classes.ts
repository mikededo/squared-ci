import type { ColumnOffset, Columns, Direction, Gap } from './types';

export const GapClasses: Record<Gap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-10',
  '3xl': 'gap-12',
  '4xl': 'gap-14',
  '5xl': 'gap-16',
  '6xl': 'gap-20',
  '7xl': 'gap-24',
  '8xl': 'gap-28',
  '9xl': 'gap-32',
  '10xl': 'gap-36',
};

export const ColGapClasses: Record<Gap, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-10',
  '3xl': 'gap-x-12',
  '4xl': 'gap-x-14',
  '5xl': 'gap-x-16',
  '6xl': 'gap-x-20',
  '7xl': 'gap-x-24',
  '8xl': 'gap-x-28',
  '9xl': 'gap-x-32',
  '10xl': 'gap-x-36',
};
export const RowGapClasses: Record<Gap, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-10',
  '3xl': 'gap-y-12',
  '4xl': 'gap-y-14',
  '5xl': 'gap-y-16',
  '6xl': 'gap-y-20',
  '7xl': 'gap-y-24',
  '8xl': 'gap-y-28',
  '9xl': 'gap-y-32',
  '10xl': 'gap-y-36',
};

export const ColumnsClasses: Record<Exclude<Columns, 0>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

export const ColumnSpanClasses: Record<Columns, string> = {
  0: '', // placeholder
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};
export const SmColumnSpanClasses: Record<Columns, string> = {
  0: '',
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  5: 'sm:col-span-5',
  6: 'sm:col-span-6',
  7: 'sm:col-span-7',
  8: 'sm:col-span-8',
  9: 'sm:col-span-9',
  10: 'sm:col-span-10',
  11: 'sm:col-span-11',
  12: 'sm:col-span-12',
};
export const MdColumnSpanClasses: Record<Columns, string> = {
  0: '',
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};
export const LgColumnSpanClasses: Record<Columns, string> = {
  0: '',
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
};
export const XlColumnSpanClasses: Record<Columns, string> = {
  0: '',
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
  6: 'xl:col-span-6',
  7: 'xl:col-span-7',
  8: 'xl:col-span-8',
  9: 'xl:col-span-9',
  10: 'xl:col-span-10',
  11: 'xl:col-span-11',
  12: 'xl:col-span-12',
};

export const ColumnOffsetClasses: Record<ColumnOffset, string> = {
  0: 'col-start-1',
  1: 'col-start-2',
  2: 'col-start-3',
  3: 'col-start-4',
  4: 'col-start-5',
  5: 'col-start-6',
  6: 'col-start-7',
  7: 'col-start-8',
  8: 'col-start-9',
  9: 'col-start-10',
  10: 'col-start-11',
  11: 'col-start-12',
};

export const DirectionClasses: Record<Direction, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};