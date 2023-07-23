import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

export const Line: RequiredChildrenFC = ({ children }) => (
  <p className="font-mono text-sm text-sky-900">{children}</p>
);

export const Keyword: RequiredChildrenFC = ({ children }) => (
  <span className="text-emerald-600">{children}</span>
);

export const Comment: RequiredChildrenFC = ({ children }) => (
  <span className="text-gray-500">{children}</span>
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
