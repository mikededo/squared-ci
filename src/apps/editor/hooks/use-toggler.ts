import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

export const useToggler = () => {
  const [on, setIsOn] = useAtom(useMemo(() => atom(false), []));

  const handleOnToggle = () => {
    setIsOn((prev) => !prev);
  };

  return { status: on, onToggle: handleOnToggle };
};
