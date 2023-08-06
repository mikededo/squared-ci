import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { Tooltip } from '@/sd';

type Props = {
  selected?: boolean;
  tooltip?: string;
};

const IconButtonBase: React.FC<
  PropsWithChildren<
    Props &
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
  >
> = ({ children, selected, className, ...props }) => (
  <button
    {...props}
    className={classNames(
      'rounded-md group px-4 py-3 border flex items-center justify-center max-w-fit hover:bg-gray-50 active:bg-gray-100 transition-all disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed',
      selected
        ? 'border-indigo-400 bg-indigo-50 dark:border-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500'
        : 'border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600',
      className
    )}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            ...child.props,
            className: classNames(
              'transition-colors group-disabled:fill-slate-400',
              selected
                ? 'fill-indigo-500 dark:fill-indigo-50'
                : 'fill-[#555] dark:fill-slate-300',
              child.props?.className
            ),
          })
        : null
    )}
  </button>
);

export const IconButton: React.FC<
  PropsWithChildren<
    Props &
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
  >
> = ({ tooltip, ...props }) => {
  if (!tooltip) {
    return <IconButtonBase {...props} />;
  }

  return (
    <Tooltip text={tooltip}>
      <IconButtonBase {...props} />
    </Tooltip>
  );
};
