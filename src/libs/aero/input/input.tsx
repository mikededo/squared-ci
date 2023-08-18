import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputVariant = 'plain' | 'default';
type InnerProps = {
  variant?: InputVariant;
};
export type Props = React.HTMLProps<HTMLInputElement> & InnerProps;

const Variants: Record<InputVariant, string> = {
  default:
    'rounded-md border border-input bg-background outline-none focus:ring-offset-2 focus:ring-offset-background focus:ring-extra focus:ring-2',
  plain:
    'border-b-2 border-b-transparent focus:border-extra bg-muted outline-none focus:ring-0',
};

export const Input: React.FC<Props> = ({ variant = 'default', ...props }) => (
  <input
    {...props}
    className={twMerge(
      'font-mono text-sm px-2 py-1.5 w-full transition-all placeholder:text-muted-foreground',
      Variants[variant],
    )}
  />
);
