import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/pulse';

import { AppearTransition } from '../transitions';

type Props = {
  show?: boolean;
  blur?: boolean;
};

export const Dialog: RequiredChildrenFC<Props> = ({ show, children, blur }) => (
  <AppearTransition show={show}>
    <div
      className={twMerge(
        'fixed bg-gray-700/30 inset-0 z-40 overflow-auto',
        blur && 'backdrop-blur-sm',
      )}
    />
    <section className="fixed transition-all top-12 bottom-12 right-1/2 translate-x-1/2 w-[600px] bg-card border rounded-2xl z-50">
      {children}
    </section>
  </AppearTransition>
);
