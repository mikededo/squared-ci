import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/pulse';

type Props = {
  main?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Banner: RequiredChildrenFC<Props> = ({
  main,
  children,
  className,
  ...props
}) => (
  <div
    className={twMerge(
      'self-start gap-4 p-2 rounded-lg text-center bg-accent text-sm',
      className,
    )}
    {...props}
  >
    {main ? (
      <strong className="font-semibold inline-block">{main}</strong>
    ) : null}
    {children}
  </div>
);
