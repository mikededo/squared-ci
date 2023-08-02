import classNames from 'classnames';
import React from 'react';

type Props = {
  text: string;
  value: boolean;
  disabled?: boolean;
  onClick: () => void;
  condensed?: boolean;
};

export const Toggle: React.FC<Props> = ({
  text,
  disabled,
  value,
  condensed,
  onClick,
}) => (
  <label className={classNames('flex justify-between items-center')}>
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
        className={classNames(
          "peer rounded-full transition-all after:content-[''] after:absolute after:top-[2px] after:border-gray-300 after:border after:rounded-full after:transition-all after:bg-white",
          value
            ? 'after:translate-x-full after:border-white bg-amber-500 dark:border-gray-600'
            : 'bg-gray-200 dark:bg-gray-700',
          disabled
            ? 'bg-gray-300 dark:bg-gray-500 cursor-not-allowed'
            : 'cursor-pointer',
          condensed
            ? 'w-[30px] h-4 after:h-3 after:w-3 after:left-[3px]'
            : 'w-11 h-6 after:h-5 after:w-5 after:left-[2px]'
        )}
      />
    </div>
  </label>
);
