import classNames from 'classnames';
import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';

type Props = { className?: string } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Meta: RequiredChildrenFC<Props> = ({
  children,
  className,
  ...props
}) => (
  <p className={classNames('text-sm text-gray-400', className)} {...props}>
    {children}
  </p>
);

export const Label: RequiredChildrenFC<Props> = ({
  children,
  className,
  ...props
}) => (
  <p
    className={classNames('font-mono italic text-xs text-gray-400', className)}
    {...props}
  >
    {children}
  </p>
);
