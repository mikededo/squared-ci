import React from 'react';

import type { RequiredChildrenFC } from '@/pulse';

// TODO: Extract colors into css variables, exclusively for the visualiser

export const Line: RequiredChildrenFC = ({ children }) => (
  <p className="font-mono text-sm text-sky-900 dark:text-sky-200">{children}</p>
);

export const Keyword: RequiredChildrenFC = ({ children }) => (
  <span className="text-emerald-600 dark:text-green-400">{children}</span>
);

export const Comment: RequiredChildrenFC = ({ children }) => (
  <span className="text-muted-foreground">{children}</span>
);

export const Tabbed: RequiredChildrenFC<{ tabs: number }> = ({
  children,
  tabs,
}) => (
  <Line>
    <span>{'\xa0'.repeat(tabs)}</span>
    {children}
  </Line>
);
