import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { PermissionStatus } from '@/editor/domain/permissions';

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
        'text-xs font-mono px-2 rounded transition-all text-foreground border border-transparent hover:bg-muted',
        active && 'bg-extra hover:bg-extra/80 text-extra-foreground',
      )}
      onClick={handleOnClick}
    >
      {status}
    </button>
  );
};
