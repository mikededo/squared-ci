import { ChevronLeftIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';
import type { PropsWithChildren } from 'react';

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <article
      className={classNames(
        'fixed transition-all top-4 bottom-4 w-[600px] bg-white px-4 pt-2 pb-4 border border-slate-200 rounded-lg',
        opened ? 'right-4' : '-right-[600px]'
      )}
    >
      <div
        className="w-10 h-10 bg-white rounded-lg absolute top-4 -left-10 rounded-r-none border border-slate-200 flex justify-center items-center"
        onClick={onToggleStatus}
      >
        <div className="hover:bg-slate-50 active:bg-slate-200 rounded-full w-8 h-8 flex justify-center items-center">
          <ChevronLeftIcon
            className={classNames(
              'transition-transform delay-150 cursor-pointer ',
              opened ? 'rotate-180' : 'rotate-0'
            )}
          />
        </div>
      </div>
      {children}
    </article>
  );
};
