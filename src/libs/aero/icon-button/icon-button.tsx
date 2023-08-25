import type { PropsWithChildren } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Tooltip } from '@/aero';

type Variant = 'default' | 'plain';
type CustomProps = {
  selected?: boolean;
  tooltip?: string;
  variant?: Variant;
};
type Props = PropsWithChildren<
  CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const sharedClasses =
  'disabled:pointer-events-none disabled:cursor-not-allowed';

const Variant: Record<Variant, string> = {
  default: twMerge(
    sharedClasses,
    'rounded-md px-4 py-3 flex items-center justify-center max-w-fit transition-all hover:bg-secondary/90 border fill-foreground disabled:bg-muted disabled:fill-foreground/20',
  ),
  plain: twMerge(
    sharedClasses,
    'flex items-center justify-center outline-none rounded-full hover:bg-muted transition-colors',
  ),
};
const SelectedVariant: Record<Variant, string> = {
  default: 'border-extra bg-extra/30 hover:bg-extra/50',
  plain: '',
};

const IconButtonBase = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, selected, className, variant = 'default', ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={twMerge(
        Variant[variant],
        selected && SelectedVariant[variant],
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              className: twMerge(
                'transition-colors',
                selected && 'fill-extra',
                variant === 'plain' && props.disabled && 'fill-muted',
                child.props?.className,
              ),
            })
          : null,
      )}
    </button>
  ),
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
