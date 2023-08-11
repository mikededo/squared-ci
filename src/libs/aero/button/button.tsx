import React from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'text';
type DefaultProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
>;
type InternalProps = {
  variant?: Variant;
  children: React.ReactNode;
};
type Props = DefaultProps & InternalProps;

const Variants: Record<Variant, string> = {
  primary: 'bg-primary hover:bg-primary/80 text-primary-foreground',
  secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
  text: 'hover:bg-accent hover:text-accent-foreground',
};

export const Button: React.FC<Props> = ({
  className,
  children,
  variant = 'primary',
  disabled,
  ...props
}) => (
  <button
    className={twMerge(
      'min-h-[36px] py-1.5 px-4 rounded-full transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:cursor-not-allowed',
      !disabled && [Variants[variant]],
      className
    )}
    disabled={disabled}
    {...props}
  >
    <span className="uppercase text-sm font-semibold">{children}</span>
  </button>
);
