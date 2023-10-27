import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

type SideEffectHelpers = {
  onResetInput: (value?: string) => void;
};
type Options = {
  tabCount?: [number, number];
  numOnly?: boolean;
  spaceAsUnderscore?: boolean;
  preventUppercase?: boolean;
};
type SideEffects = {
  onEnterPress?: (value: string, helpers: SideEffectHelpers) => void;
  onTabPress?: (
    value: string,
    count: number,
    helpers: SideEffectHelpers,
  ) => void;
  onShiftTabPress?: (
    value: string,
    count: number,
    helpers: SideEffectHelpers,
  ) => void;
};

export const useAdvancedInput = (
  initialValue: string,
  {
    tabCount: [minTabCount, maxTabCount] = [-Infinity, Infinity],
    numOnly,
    spaceAsUnderscore,
    preventUppercase,
    onEnterPress,
    onTabPress,
    onShiftTabPress,
  }: SideEffects & Options,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [value, setValue] = useAtom(useMemo(() => atom(initialValue), []));
  const [tabCount, setTabCount] = useAtom(useMemo(() => atom(0), []));

  const onResetInput = (value?: string) => {
    setValue(value ?? initialValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = spaceAsUnderscore ? value.replaceAll(' ', '_') : value;
    value = preventUppercase ? value.toLowerCase() : value;

    setValue(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const helpers = { onResetInput };

    if (numOnly && !/^[0-9]+$/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      onEnterPress?.(e.currentTarget.value, helpers);
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      onTabPress?.(e.currentTarget.value, tabCount, helpers);
      setTabCount(tabCount + 1 > maxTabCount ? minTabCount : tabCount + 1);
    }
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      onShiftTabPress?.(e.currentTarget.value, tabCount, helpers);
      setTabCount(tabCount - 1 < minTabCount ? maxTabCount : tabCount - 1);
    }
  };

  return { value, onChange, onKeyDown };
};
