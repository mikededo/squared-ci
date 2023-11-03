import { ChevronDownIcon } from '@primer/octicons-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Input } from '@/aero';

import type { InputProps } from '../input';

type SelectInputProps = {
  inputProps: InputProps;
  onChange: InputProps['onChange'];
  onBlur: InputProps['onBlur'];
  onFocus: InputProps['onFocus'];
  rotateIcon: boolean;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  inputProps,
  onChange,
  onBlur,
  onFocus,
  rotateIcon,
}) => (
  <Input
    {...inputProps}
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    icon={
      <ChevronDownIcon
        className={twMerge('transition-transform', rotateIcon && 'rotate-180')}
      />
    }
  />
);
