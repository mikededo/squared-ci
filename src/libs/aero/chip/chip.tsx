import { XCircleIcon } from '@primer/octicons-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  text: string;
  active?: boolean;
  monospace?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const Chip: React.FC<Props> = ({
  text,
  active,
  monospace,
  disabled,
  onClick,
}) => (
  <button
    className={twMerge(
      'py-1 px-2 rounded-full w-fit flex items-center gap-2 transition-all cursor-pointer bg-muted hover:bg-muted-hover disabled:bg-slate-400 dark:disabled:bg-slate-500 disabled:cursor-not-allowed',
      active && 'bg-extra hover:bg-extra/80',
    )}
    role="checkbox"
    aria-checked={active}
    disabled={disabled}
    aria-disabled={disabled}
    onClick={onClick}
  >
    <p
      className={twMerge(
        'text-sm leading-4 text-secondary-foreground line-clamp-1',
        active && 'text-extra-foreground',
        monospace && 'font-mono text-xs',
      )}
    >
      {text}
    </p>
    {active ? <XCircleIcon className="fill-extra-foreground" /> : null}
  </button>
);
