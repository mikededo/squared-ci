import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { PermissionStatus } from '@/domain/permissions';

type Props = {
  status: PermissionStatus;
  active?: boolean;
  onClick: (status: PermissionStatus) => void;
};

export const PermissionButton: React.FC<Props> = ({
  status,
  active,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick(status);
  };

  return (
    <button
      name={status}
      className={twMerge(
        'text-xs font-mono px-2 rounded-md flex items-center justify-center transition-all dark:hover:bg-slate-500 dark:active:bg-slate-400 cursor-pointer bg-transparent text-current hover:bg-gray-100 active:bg-gray-200',
        active &&
          'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 dark:bg-slate-600 text-white'
      )}
      onClick={handleOnClick}
    >
      {status}
    </button>
  );
};
