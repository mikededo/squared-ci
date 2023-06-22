import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

export const useActiveChildren = () => {
  const [activeChildren, setActiveChildren] = useAtom(
    useMemo(() => atom(new Map<string, boolean>()), [])
  );
  const [activeCount, setActiveCount] = useAtom(useMemo(() => atom(0), []));

  const handleOnChildChange = (child: string) => {
    const current = activeChildren.get(child);
    const updated = new Map([...activeChildren]);

    updated.set(child, current === undefined ? true : !current);

    setActiveChildren(updated);
    setActiveCount(current ? activeCount - 1 : activeCount + 1);
  };

  return {
    isAnyChildActive: activeCount > 0,
    onChange: handleOnChildChange,
  };
};
