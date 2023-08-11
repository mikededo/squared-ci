import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Row } from '../row';

type Props = {
  text: string;
  condensed?: boolean;
} & (
  | { disabled?: boolean; value: boolean; onClick: () => void }
  | { disabled: true; value?: never; onClick?: never }
);

export const Toggle: React.FC<Props> = ({
  text,
  disabled,
  value,
  condensed,
  onClick,
}) => (
  <Row as="label" justify="between" align="center">
    <p className="text-sm">{text}</p>
    <div className="relative">
      <input
        type="checkbox"
        value={String(value)}
        checked={value}
        className="sr-only peer"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        readOnly
      />
      <div
        className={twMerge(
          "peer rounded-full border transition-all after:content-[''] after:absolute after:top-[2px] after:border after:rounded-full after:transition-all after:bg-white bg-muted cursor-pointer w-11 h-6 after:h-5 after:w-5 after:left-[2px]",
          disabled && 'opacity-95 border-transparent cursor-not-allowed',
          value && 'after:translate-x-full bg-secondary',
          condensed && 'w-[30px] h-4 after:h-3 after:w-3 after:left-[3px]'
        )}
      />
    </div>
  </Row>
);
