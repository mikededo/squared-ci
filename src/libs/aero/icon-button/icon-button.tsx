import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Tooltip } from '@/aero';

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
        'rounded-md px-4 py-3 flex items-center justify-center max-w-fit transition-all hover:bg-secondary/90 border disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted fill-foreground disabled:fill-foreground/20',
        selected && 'border-extra bg-extra/30 hover:bg-extra/50',
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              className: twMerge(
                'transition-colors',
                selected && 'fill-extra',
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
