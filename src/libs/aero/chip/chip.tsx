import { XCircleIcon } from '@primer/octicons-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  text: string;
  active?: boolean;
  onClick?: () => void;
};

export const Chip: React.FC<Props> = ({ text, active, onClick }) => (
  <div
    className={twMerge(
      'py-1 px-2 rounded-full w-fit flex items-center gap-2 transition-all cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 active:bg-gray-300',
      active &&
        'bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300 dark:bg-indigo-200 dark:hover:bg-indigo-100 dark:active:bg-indigo-300'
    )}
    onClick={onClick}
  >
    <p
      className={twMerge(
        'text-sm leading-4 text-gray-500 dark:text-slate-200',
        active && 'text-indigo-600'
      )}
    >
      {text}
    </p>
    {active ? <XCircleIcon className="fill-indigo-500" /> : null}
  </div>
);
