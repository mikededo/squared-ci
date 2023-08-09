import React from 'react';

export const Input: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="font-mono text-sm px-2 py-1.5 rounded-md w-full border border-gray-200 dark:border-slate-400 outline-none transition-all focus:ring-offset-2 focus:ring-indigo-400 focus:ring-2 dark:bg-slate-700 dark:placeholder:text-slate-200 dark:focus:ring-offset-2 dark:focus:ring-offset-slate-700"
  />
);
