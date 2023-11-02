import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { PermissionStatus } from '@/editor/domain/permissions';

type Props = {
  status: PermissionStatus;
  active?: boolean;
  condensed?: boolean;
  onClick: (status: PermissionStatus) => void;
};

export const PermissionButton: React.FC<Props> = ({
  status,
  active,
  condensed,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick(status);
  };

  return (
    <button
      name={status}
      className={twMerge(
        'font-mono px-2 rounded transition-all text-foreground border border-transparent hover:bg-muted',
        condensed && 'text-xs',
        active && 'bg-extra hover:bg-extra/80 text-extra-foreground',
      )}
      onClick={handleOnClick}
    >
      {status}
    </button>
  );
};
