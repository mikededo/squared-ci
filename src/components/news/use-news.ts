import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

import { LS } from '@/domain/local-storage';

export const useNews = () => {
  const [opened, setOpened] = useAtom(
    useMemo(() => {
      const showNews = LS.get('showNews');
      if (showNews === undefined || showNews === null) {
        LS.set('showNews', true);
      }
      return atom(showNews ?? true);
    }, [])
  );

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  const onHideNews = () => {
    setOpened(false);
    LS.set('showNews', false);
  };

  return {
    opened,
    onToggleStatus,
    onHideNews,
  };
};
