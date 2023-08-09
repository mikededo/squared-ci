import { BeakerIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/editor/domain/shared';
import { useActiveFSCount } from '@/editor/stores';

export const Page: RequiredChildrenFC = ({ children }) => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));
  const activeFSCount = useActiveFSCount();

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <article
      className={twMerge(
        'fixed transition-all top-4 min-h-[240px] w-[400px] bg-white dark:bg-slate-800 px-4 pt-2 pb-4 border border-slate-200 dark:border-slate-400 rounded-lg -left-[400px]',
        opened && 'left-4',
      )}
    >
      <div
        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg absolute top-4 -right-10 rounded-l-none border border-slate-200 flex justify-center items-center"
        onClick={onToggleStatus}
      >
        <div className="hover:bg-slate-50 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:border-slate-400 rounded-full w-8 h-8 flex justify-center items-center transition-colors">
          <BeakerIcon
            className={twMerge(
              'transition-all cursor-pointer fill-current',
              opened && 'fill-amber-500',
            )}
          />
        </div>
        <div
          className={twMerge(
            'absolute bg-orange-500 rounded-full -top-1 -right-1 transition-transform h-3 w-3 origin-center animate-ping opacity-0',
            activeFSCount > 0 && 'opacity-50',
          )}
        />
        <div
          className={twMerge(
            'absolute bg-amber-500 rounded-full -top-1 -right-1 transition-transform h-3 w-3 origin-center scale-0',
            activeFSCount > 0 && 'scale-100',
          )}
        />
      </div>
      {children}
    </article>
  );
};
