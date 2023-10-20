import React, { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { useSearchParam } from '@/chain';

import type { Views } from './types';

type Props = {
  paramValue: Views;
};

export const DialogMenuItem: React.FC<PropsWithChildren<Props>> = ({
  children,
  paramValue,
}) => {
  const { getParam, setParam } = useSearchParam();
  const active = getParam('view') === paramValue;

  const handleOnClick = () => {
    if (active) {
      return;
    }

    setParam('view', paramValue);
  };

  return (
    <li
      className={twMerge(
        'rounded-md py-2 pl-3 mr-2 transition-all cursor-pointer',
        active
          ? 'bg-muted/75 dark:bg-muted/50 rounded-r-none mr-0'
          : 'hover:bg-muted',
      )}
      onClick={handleOnClick}
    >
      {children}
    </li>
  );
};
