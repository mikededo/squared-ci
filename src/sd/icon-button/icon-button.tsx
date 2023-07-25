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
      'rounded-md px-4 py-3 border flex items-center justify-center max-w-fit hover:bg-gray-50 active:bg-gray-500 transition-all ',
      selected
        ? 'border-indigo-400 bg-indigo-50 dark:border-slate-300 dark:bg-slate-700 dark:hover:bg-slate-500'
        : 'border-slate-200 dark:hover:bg-slate-700 dark:border-slate-600'
    )}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            ...child.props,
            className: classNames(
              child.props?.className,
              'transition-colors',
              selected
                ? 'fill-indigo-500 dark:fill-indigo-50'
                : 'fill-[#333] dark:fill-slate-300'
            ),
          })
        : null
    )}
  </button>
);
