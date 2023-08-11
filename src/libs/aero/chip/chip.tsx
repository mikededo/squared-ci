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
      'py-1 px-2 rounded-full w-fit flex items-center gap-2 transition-all cursor-pointer bg-secondary/70 hover:bg-secondary',
      active && 'bg-extra hover:bg-extra/80',
    )}
    onClick={onClick}
  >
    <p
      className={twMerge(
        'text-sm leading-4 text-secondary-foreground line-clamp-1',
        active && 'text-extra-foreground',
      )}
    >
      {text}
    </p>
    {active ? <XCircleIcon className="fill-extra-foreground" /> : null}
  </div>
);
