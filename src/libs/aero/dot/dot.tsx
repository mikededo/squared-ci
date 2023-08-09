import React from 'react';
import { twMerge } from 'tailwind-merge';

export type DotPosition = 'right' | 'left' | 'top' | 'bottom';
type Props = {
  position?: DotPosition;
  active?: boolean;
};

export const Dot: React.FC<Props> = ({ active, position }) => (
  <div
    className={twMerge(
      'rounded-full absolute top-1/2 -translate-y-1.5  h-3 w-3 ring-2 ring-offset-2 pointer transition-all bg-gray-300 ring-transparent ring-offset-transparent',
      active && 'bg-indigo-500 ring-indigo-500 ring-offset-white',
      position === 'left' && '-left-1.5',
      position === 'right' && '-right-1.5'
    )}
  />
);
