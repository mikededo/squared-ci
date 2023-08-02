import classNames from 'classnames';
import React from 'react';

type Props = {
  text: string;
  active?: boolean;
};

export const PermissionButton: React.FC<Props> = ({ text, active }) => (
  <span
    className={classNames(
      'text-xs font-mono px-2 rounded-md flex items-center justify-center transition-all hover:bg-indigo-300 active:bg-indigo-400 dark:hover:bg-slate-600 dark:active:bg-slate-500 cursor-pointer',
      active
        ? 'bg-indigo-500 dark:bg-slate-700 text-white'
        : 'bg-transparent text-current'
    )}
  >
    {text}
  </span>
);
