import { ChevronLeftIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <article
      className={twMerge(
        'fixed transition-all top-4 bottom-4 w-[600px] bg-white dark:bg-slate-800 px-4 pt-2 pb-4 border border-slate-200 dark:border-slate-400 rounded-lg -right-[600px]',
        opened && 'right-4'
      )}
    >
      <div
        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg absolute top-4 -left-10 rounded-r-none border border-slate-200 dark:border-slate-400 flex justify-center items-center"
        onClick={onToggleStatus}
      >
        <div className="hover:bg-slate-50 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded-full w-8 h-8 flex justify-center items-center transition-colors">
          <ChevronLeftIcon
            className={twMerge(
              'transition-transform delay-150 cursor-pointer rotate-0',
              opened && 'rotate-180'
            )}
          />
        </div>
      </div>
      {children}
    </article>
  );
};
