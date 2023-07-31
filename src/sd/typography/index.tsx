import classNames from 'classnames';
import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

type Props = { className?: string };

export const Meta: RequiredChildrenFC<Props> = ({ children, className }) => (
  <p className={classNames('text-sm text-gray-400', className)}>{children}</p>
);

export const Label: RequiredChildrenFC<Props> = ({ children, className }) => (
  <p
    className={classNames('font-mono italic text-xs text-gray-400', className)}
  >
    {children}
  </p>
);
