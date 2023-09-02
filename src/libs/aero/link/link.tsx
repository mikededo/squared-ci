import React from 'react';

import type { RequiredChildrenFC } from '@/pulse';

type Props = {
  href: string;
};

export const Link: RequiredChildrenFC<Props> = ({ children, href }) => (
  <a
    href={href}
    className="no-underline text-blue-500 hover:underline hover:underline-offset-2"
    target="_blank"
  >
    {children}
  </a>
);
