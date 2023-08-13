import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/pulse';

import { AppearTransition } from '../transitions';

type Props = {
  show?: boolean;
  blur?: boolean;
};

export const Dialog: RequiredChildrenFC<Props> = ({ show, children, blur }) => (
  <AppearTransition show={!!show}>
    <div
      className={twMerge(
        'fixed bg-gray-700/30 inset-0 z-40 overflow-auto',
        blur && 'backdrop-blur-sm',
      )}
    />
    <section className="fixed transition-all w-full md:border md:rounded-2xl top-0 bottom-0 md:top-12 md:bottom-12 md:right-1/2 md:translate-x-1/2 md:w-[600px] bg-card z-50">
      {children}
    </section>
  </AppearTransition>
);
