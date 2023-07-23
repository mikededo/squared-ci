import { BeakerIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

export const Page: RequiredChildrenFC = ({ children }) => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <article
      className={classNames(
        'fixed transition-all top-4 min-h-[240px] w-[400px] bg-white px-4 pt-2 pb-4 border border-slate-200 rounded-lg',
        opened ? 'left-4' : '-left-[400px]'
      )}
    >
      <div
        className="w-10 h-10 bg-white rounded-lg absolute top-4 -right-10 rounded-l-none border border-slate-200 flex justify-center items-center"
        onClick={onToggleStatus}
      >
        <div className="hover:bg-slate-50 active:bg-slate-200 rounded-full w-8 h-8 flex justify-center items-center">
          <BeakerIcon
            className={classNames(
              'transition-all cursor-pointer',
              opened ? 'fill-indigo-500' : 'fill-current'
            )}
          />
        </div>
      </div>
      {children}
    </article>
  );
};
