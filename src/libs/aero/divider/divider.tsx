import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = { className?: string };

export const Divider: React.FC<Props> = ({ className }) => (
  <hr className={twMerge('w-100 mb-2 border-dashed', className)} />
);
