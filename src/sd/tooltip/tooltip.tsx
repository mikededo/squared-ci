import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

type Props = { text: string };

export const Tooltip: RequiredChildrenFC<Props> = ({ text, children }) => (
  <div className="group relative flex">
    {children}
    <span className="absolute top-10 scale-0 transition-transform -translate-x-1/3 rounded bg-slate-700 dark:bg-slate-600 py-1 px-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
      {text}
    </span>
  </div>
);
