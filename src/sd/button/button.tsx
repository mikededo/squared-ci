import classNames from 'classnames';
import React from 'react';

type DefaultProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
>;
type InternalProps = {
  variant?: 'primary' | 'secondary' | 'text';
  children: string;
};
type Props = DefaultProps & InternalProps;

export const Button: React.FC<Props> = ({
  className,
  children,
  variant = 'primary',
  ...props
}) => (
  <button
    className={classNames(
      'py-2 px-4 rounded-full transition-colors',
      variant === 'primary'
        ? 'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-400'
        : '',
      variant === 'secondary'
        ? 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500'
        : '',
      variant === 'text'
        ? 'bg-transparent hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:bg-opacity-50'
        : '',
      className
    )}
    {...props}
  >
    <p
      className={classNames(
        'uppercase text-white text-sm font-semibold',
        variant === 'text' ? 'text-current dark:text-white' : ''
      )}
    >
      {children}
    </p>
  </button>
);
