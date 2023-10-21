import React from 'react';
import type { PropsWithChildren } from 'react';

export const SectionWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-6">{children}</div>
);
