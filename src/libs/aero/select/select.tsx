import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { SelectInput } from './select-input';
import { SelectOption } from './select-option';
import type { InputProps } from '../input';
import { AppearTransition } from '../transitions';

type BaseProps = {
  filter?: boolean;
  defaultValue?: string;
  inputProps: InputProps;
  loading?: boolean;
  skeleton?: React.ComponentType;
  skeletonCount?: number;
  maxHeight?: `max-h-${string}`;
};
type DefaultOptionsProps<
  O extends Record<string, string> = Record<string, string>,
> = {
  options: O;
  onClickOption: (key: keyof O) => void;
  children?: undefined;
};
type CustomRenderProps = {
  options?: undefined;
  onClickOption?: undefined;
  children: React.ReactNode;
};
type Props<O extends Record<string, string> = Record<string, string>> =
  BaseProps & (DefaultOptionsProps<O> | CustomRenderProps);

type Opts = {
  onClick: (key: string) => () => void;
};

const isCustomRenderProps = <O extends Record<string, string>>(
  props: DefaultOptionsProps<O> | CustomRenderProps,
): props is CustomRenderProps => props.children !== undefined;

const filterOptions = (
  options: Record<string, string>,
  inputValue: string,
  { onClick }: Opts,
) =>
  Object.entries(options).reduce<React.JSX.Element[]>(
    (list, [key, value]) =>
      value.toLowerCase().includes(inputValue.toLowerCase())
        ? [
            ...list,
            <SelectOption key={key} text={value} onClick={onClick(key)} />,
          ]
        : list,
    [],
  );

const renderOptions = (options: Record<string, string>, { onClick }: Opts) =>
  Object.entries(options).map(([key, value]) => (
    <SelectOption key={key} text={value} onClick={onClick(key)} />
  ));

export const Select = <
  O extends Record<string, string> = Record<string, string>,
>({
  filter,
  defaultValue,
  loading,
  skeleton: Skeleton = React.Fragment,
  skeletonCount = 3,
  inputProps,
  maxHeight,
  ...conditionalProps
}: Props<O>): JSX.Element => {
  const [show, setShow] = useAtom(useMemo(() => atom(false), []));
  const [internalInput, setInternalInput] = useAtom(
    useMemo(() => atom(defaultValue ?? ''), [defaultValue]),
  );

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setShow(false);
    inputProps.onBlur?.(e);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setShow(true);
    inputProps.onBlur?.(e);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalInput(e.currentTarget.value);
    inputProps.onChange?.(e);
  };

  const selectInputProps = {
    inputProps: { ...inputProps, value: internalInput },
    onChange: handleOnChange,
    onBlur: handleOnBlur,
    onFocus: handleOnFocus,
  };

  if (isCustomRenderProps(conditionalProps)) {
    const { children } = conditionalProps;
    const childrenCount = React.Children.count(children);

    return (
      <div className="relative w-full">
        <SelectInput {...selectInputProps} rotateIcon={show} />
        <AppearTransition
          as={React.Fragment}
          show={show && (childrenCount > 0 || !!loading)}
        >
          <div
            className={twMerge(
              'absolute top-9 overflow-auto w-full bg-muted border-2 border-muted-hover z-10 block',
              maxHeight ?? 'max-h-36',
            )}
          >
            {loading
              ? [...Array(skeletonCount)].map((_, i) => <Skeleton key={i} />)
              : children}
          </div>
        </AppearTransition>
      </div>
    );
  }

  const { options, onClickOption } = conditionalProps;
  const handleOnClick = (option: string) => () => {
    if (loading) {
      return;
    }

    onClickOption(option);
    setShow(false);
  };

  const opts: Opts = { onClick: handleOnClick };
  const renderedOptions = loading
    ? [...Array(skeletonCount)].map((_, i) => <Skeleton key={i} />)
    : filter && internalInput
    ? filterOptions(options, internalInput, opts)
    : renderOptions(options, opts);

  return (
    <div className="relative w-full">
      <SelectInput {...selectInputProps} rotateIcon={show} />
      <AppearTransition
        as={React.Fragment}
        show={show && (renderedOptions.length > 0 || !!loading)}
      >
        <div
          className={twMerge(
            'absolute top-9 overflow-auto w-full bg-muted border-2 border-muted-hover z-10 block',
            maxHeight ?? 'max-h-36',
          )}
        >
          {renderedOptions}
        </div>
      </AppearTransition>
    </div>
  );
};
