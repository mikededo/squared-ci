import { BeakerIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';
import { useActiveFSCount } from '@/stores';

export const Page: RequiredChildrenFC = ({ children }) => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));
  const activeFSCount = useActiveFSCount();

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <article
      className={classNames(
        'fixed transition-all top-4 min-h-[240px] w-[400px] bg-white dark:bg-slate-800 px-4 pt-2 pb-4 border border-slate-200 dark:border-slate-400 rounded-lg',
        opened ? 'left-4' : '-left-[400px]'
      )}
    >
      <div
        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg absolute top-4 -right-10 rounded-l-none border border-slate-200 flex justify-center items-center"
        onClick={onToggleStatus}
      >
        <div className="hover:bg-slate-50 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:border-slate-400 rounded-full w-8 h-8 flex justify-center items-center transition-colors">
          <BeakerIcon
            className={classNames(
              'transition-all cursor-pointer',
              opened ? 'fill-indigo-500' : 'fill-current'
            )}
          />
        </div>
        <div
          className={classNames(
            'absolute bg-orange-500 rounded-full -top-1 -right-1 transition-transform h-3 w-3 origin-center animate-ping',
            activeFSCount > 0 ? 'opacity-50' : 'opacity-0'
          )}
        />
        <div
          className={classNames(
            'absolute bg-amber-500 rounded-full -top-1 -right-1 transition-transform h-3 w-3 origin-center',
            activeFSCount > 0 ? 'scale-100' : 'scale-0'
          )}
        />
      </div>
      {children}
    </article>
  );
};
