import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = { className?: string };

export const Divider: React.FC<Props> = ({ className }) => (
  <hr className={twMerge('w-full mb-2 border-1 border-dashed', className)} />
);
