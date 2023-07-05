import React from 'react';
import type { PropsWithChildren } from 'react';

type RequiredChildrenFC = React.FC<Required<PropsWithChildren>>;

export const Line: RequiredChildrenFC = ({ children }) => (
  <p className="font-mono text-sm">{children}</p>
);

export const Keyword: RequiredChildrenFC = ({ children }) => (
  <span className="text-emerald-600">{children}</span>
);

export const Comment: RequiredChildrenFC = ({ children }) => (
  <span className="text-gray-500">{children}</span>
);

export const Tabbed: React.FC<
  Required<PropsWithChildren<{ tabs: number }>>
> = ({ children, tabs }) => (
  <Line>
    <span>{'\xa0'.repeat(tabs)}</span>
    {children}
  </Line>
);
