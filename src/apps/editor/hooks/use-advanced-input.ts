import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

type Helpers = {
  onResetInput: (value?: string) => void;
};
type Options = {
  tabCount?: [number, number];
  numOnly?: boolean;
  spaceAsUnderscore?: boolean;
  disableSpaces?: boolean;
  preventUppercase?: boolean;
};
type SideEffects = {
  onBlur?: (value: string, helpers: Helpers) => void;
  onEnterPress?: (value: string, helpers: Helpers) => void;
  onTabPress?: (value: string, count: number, helpers: Helpers) => void;
  onShiftTabPress?: (value: string, count: number, helpers: Helpers) => void;
};
type Methods = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
type UseAdvancedInputResult = [Methods, Helpers];

export const useAdvancedInput = (
  initialValue: string,
  {
    tabCount: [minTabCount, maxTabCount] = [-Infinity, Infinity],
    numOnly,
    spaceAsUnderscore,
    disableSpaces,
    preventUppercase,
    onBlur,
    onEnterPress,
    onTabPress,
    onShiftTabPress,
  }: SideEffects & Options,
): UseAdvancedInputResult => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [value, setValue] = useAtom(useMemo(() => atom(initialValue), []));
  const [tabCount, setTabCount] = useAtom(useMemo(() => atom(0), []));

  const onResetInput = (value?: string) => {
    setValue(value ?? initialValue);
  };

  const helpers = { onResetInput };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    const spaceReplacement = spaceAsUnderscore ? '_' : disableSpaces ? '' : ' ';
    value =
      spaceReplacement !== ' '
        ? value.replaceAll(' ', spaceReplacement)
        : value;
    value = preventUppercase ? value.toLowerCase() : value;

    setValue(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (numOnly && !/^[0-9]+$/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' && onEnterPress) {
      e.preventDefault();
      onEnterPress(e.currentTarget.value, helpers);
    }
    if (e.key === 'Tab' && !e.shiftKey && onTabPress) {
      e.preventDefault();
      onTabPress(e.currentTarget.value, tabCount, helpers);
      setTabCount(tabCount + 1 > maxTabCount ? minTabCount : tabCount + 1);
    }
    if (e.key === 'Tab' && e.shiftKey && onShiftTabPress) {
      e.preventDefault();
      onShiftTabPress(e.currentTarget.value, tabCount, helpers);
      setTabCount(tabCount - 1 < minTabCount ? maxTabCount : tabCount - 1);
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!onBlur) {
      return;
    }

    const helpers = { onResetInput };
    onBlur(e.currentTarget.value, helpers);
  };

  const methods = { value, onChange, onKeyDown, onBlur: handleOnBlur };
  return [methods, helpers];
};
