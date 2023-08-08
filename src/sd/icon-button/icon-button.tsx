import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Tooltip } from '@/sd';

type CustomProps = {
  selected?: boolean;
  tooltip?: string;
};
type Props = PropsWithChildren<
  CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const IconButtonBase = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, selected, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={twMerge(
        'rounded-md group px-4 py-3 border flex items-center justify-center max-w-fit hover:bg-gray-50 active:bg-gray-100 transition-all disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed border-slate-300 dark:hover:bg-slate-700 dark:border-slate-600',
        selected &&
          'border-indigo-400 bg-indigo-50 dark:border-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500',
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              className: twMerge(
                'transition-colors group-disabled:fill-slate-400 fill-[#555] dark:fill-slate-300',
                selected && 'fill-indigo-500 dark:fill-indigo-50',
                child.props?.className
              ),
            })
          : null
      )}
    </button>
  )
);

export const IconButton: React.FC<Props> = ({ tooltip, ...props }) => {
  if (!tooltip) {
    return <IconButtonBase {...props} />;
  }

  return (
    <Tooltip text={tooltip}>
      <IconButtonBase {...props} />
    </Tooltip>
  );
};
