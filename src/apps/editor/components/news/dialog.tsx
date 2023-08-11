import React from 'react';
import type { PropsWithChildren } from 'react';

export const Dialog: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="fixed bg-gray-700/30 inset-0 z-40 backdrop-blur-sm overflow-auto" />
    <section className="fixed transition-all top-12 bottom-12 right-1/2 translate-x-1/2 w-[600px] bg-card border rounded-2xl z-50">
      {children}
    </section>
  </>
);
