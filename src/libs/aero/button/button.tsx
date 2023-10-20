import React from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'text' | 'danger';
type DefaultProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
>;
type InternalProps = {
  condensed?: boolean;
  variant?: Variant;
  children: React.ReactNode;
};
type Props = DefaultProps & InternalProps;

const Variants: Record<Variant, string> = {
  primary:
    'bg-primary hover:bg-primary/80 text-primary-foreground disabled:bg-slate-400 dark:disabled:bg-slate-500',
  secondary:
    'bg-secondary hover:bg-secondary/80 text-secondary-foreground dark:disabled:bg-secondary/40 disabled:text-secondary-foreground/50',
  danger: 'bg-destructive hover:bg-destructive/80 text-destructive-foreground',
  text: 'hover:bg-accent hover:text-accent-foreground',
};

export const Button: React.FC<Props> = ({
  className,
  children,
  condensed,
  variant = 'primary',
  disabled,
  ...props
}) => (
  <button
    className={twMerge(
      'min-h-[36px] py-1.5 px-4 rounded-full transition-colors  disabled:cursor-not-allowed flex items-center',
      Variants[variant],
      condensed && 'min-h-[24px] px-3',
      className,
    )}
    disabled={disabled}
    {...props}
  >
    <span
      className={twMerge(
        'uppercase text-sm font-semibold',
        condensed && 'text-xs',
      )}
    >
      {children}
    </span>
  </button>
);
