import React from 'react';
import { twMerge } from 'tailwind-merge';

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
  <label className="flex justify-between items-center">
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
          "peer rounded-full transition-all after:content-[''] after:absolute after:top-[2px] after:border-gray-300 after:border after:rounded-full after:transition-all after:bg-white bg-gray-200 dark:bg-gray-700 cursor-pointer w-11 h-6 after:h-5 after:w-5 after:left-[2px]",
          value &&
            'after:translate-x-full after:border-white bg-amber-500 dark:border-gray-600',
          disabled && 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed',
          condensed && 'w-[30px] h-4 after:h-3 after:w-3 after:left-[3px]'
        )}
      />
    </div>
  </label>
);
