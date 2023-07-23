import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

export const IconButton: React.FC<
  PropsWithChildren<
    { selected?: boolean } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, selected, ...props }) => (
  <button
    {...props}
    className={classNames(
      'rounded-md px-4 py-3 border flex items-center justify-center max-w-fit hover:bg-gray-50 active:bg-gray-100 transition-all',
      selected ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200'
    )}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            ...child.props,
            className: classNames(
              child.props?.className,
              'transition-colors',
              selected ? 'fill-indigo-500' : 'fill-[#333]'
            ),
          })
        : null
    )}
  </button>
);
