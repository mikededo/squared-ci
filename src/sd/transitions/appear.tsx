import { Transition } from '@headlessui/react';
import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

type Props = {
  show: boolean;
  as?: React.ElementType;
};

export const AppearTransition: RequiredChildrenFC<Props> = ({
  children,
  show,
  as = 'div',
}) => (
  <Transition
    as={as}
    show={show}
    enter="transition-opacity duration-150"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    {children}
  </Transition>
);
