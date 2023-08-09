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
  primary:
    'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-400',
  secondary:
    'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500',
  text: 'bg-transparent hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:bg-opacity-50',
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
    <span
      className={twMerge(
        'uppercase text-sm font-semibold text-white',
        variant === 'text' && 'text-current dark:text-white'
      )}
    >
      {children}
    </span>
  </button>
);
