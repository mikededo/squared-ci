import classNames from 'classnames';
import React from 'react';

type Props = {
  text: string;
  value: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export const Toggle: React.FC<Props> = ({ text, disabled, value, onClick }) => (
  <label className={classNames('flex justify-between items-center')}>
    <span className="text-sm">{text}</span>
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
          "w-11 h-6 peer rounded-full transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:bg-white",
          value
            ? 'after:translate-x-full after:border-white bg-amber-500 dark:border-gray-600'
            : 'bg-gray-200 dark:bg-gray-700',
          disabled
            ? 'bg-gray-300 dark:bg-gray-500 cursor-not-allowed'
            : 'cursor-pointer'
        )}
      />
    </div>
  </label>
);
