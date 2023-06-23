import classNames from 'classnames';
import React from 'react';

type Props = {
  position?: 'right' | 'left' | 'top' | 'bottom';
  active?: boolean;
};

export const Dot: React.FC<Props> = ({ active, position }) => (
  <div
    className={classNames(
      'bg-indigo-500 rounded-full absolute top-1/2 -translate-y-1.5  h-3 w-3 ring-2 ring-offset-2 pointer transition-all',
      active
        ? 'bg-indigo-500 ring-indigo-500 ring-offset-white'
        : 'bg-gray-300 ring-transparent ring-offset-transparen',
      position === 'left' ? '-left-1.5' : null,
      position === 'right' ? '-right-1.5' : null
    )}
  />
);
