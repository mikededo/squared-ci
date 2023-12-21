import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

export const useInput = (initialValue?: string) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [value, setValue] = useAtom(
    useMemo(() => atom(initialValue ?? ''), []),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return { value, onChange };
};
