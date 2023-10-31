import { ChevronDownIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { SelectOption } from './select-option';
import { Input } from '../input';
import type { InputProps } from '../input';
import { AppearTransition } from '../transitions';

type Props<O extends Record<string, string> = Record<string, string>> = {
  filter?: boolean;
  defaultValue?: string;
  inputProps: InputProps;
  options: O;
  onClickOption: (key: keyof O) => void;
};

type Opts = {
  onClick: (key: string) => () => void;
};

const filterOptions = (
  options: Props['options'],
  inputValue: string,
  { onClick }: Opts,
) =>
  Object.entries(options).reduce<JSX.Element[]>(
    (list, [key, value]) =>
      value.toLowerCase().includes(inputValue.toLowerCase())
        ? [
            ...list,
            <SelectOption key={key} text={value} onClick={onClick(key)} />,
          ]
        : list,
    [],
  );

const renderOptions = (options: Props['options'], { onClick }: Opts) =>
  Object.entries(options).map(([key, value]) => (
    <SelectOption key={key} text={value} onClick={onClick(key)} />
  ));

export const Select = <
  O extends Record<string, string> = Record<string, string>,
>({
  filter,
  defaultValue,
  inputProps,
  options,
  onClickOption,
}: Props<O>): JSX.Element => {
  const [show, setShow] = useAtom(useMemo(() => atom(false), []));
  const [internalInput, setInternalInput] = useAtom(
    useMemo(() => atom(defaultValue ?? ''), [defaultValue]),
  );

  const handleOnClick = (option: string) => () => {
    onClickOption(option);
    setShow(false);
  };

  const opts: Opts = { onClick: handleOnClick };
  const renderedOptions: JSX.Element[] =
    filter && internalInput
      ? filterOptions(options, internalInput, opts)
      : renderOptions(options, opts);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setShow(false);
    inputProps.onBlur?.(e);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setShow(renderedOptions.length > 0);
    inputProps.onBlur?.(e);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalInput(e.currentTarget.value);
    inputProps.onChange?.(e);
  };

  return (
    <div className="relative w-full">
      <Input
        {...inputProps}
        value={internalInput}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        icon={
          <ChevronDownIcon
            className={twMerge(
              'transition-transform',
              show && renderedOptions.length > 0 && 'rotate-180',
            )}
          />
        }
      />
      <AppearTransition
        as={React.Fragment}
        show={show && renderedOptions.length > 0}
      >
        <div className="absolute max-h-36 top-9 overflow-auto w-full bg-muted border-2 border-t-0 border-muted-hover z-10 block">
          {renderedOptions}
        </div>
      </AppearTransition>
    </div>
  );
};
