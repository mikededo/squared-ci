import React from 'react';

import { useSearchParam } from '@/chain';

import type { Views } from './types';

const VIEW_TO_TITLE: Record<Views, string> = {
  b: 'Base',
  p: 'Permissions',
  coc: 'Concurrency',
  o: 'Outputs',
  e: 'Env',
  d: 'Defaults',
  ste: 'Steps',
  str: 'Strategy',
  con: 'Container',
  ser: 'Services',
  h: 'Help',
};

export const DialogTitle: React.FC = () => {
  const { getParam } = useSearchParam();

  return (
    <h3 className="p-4 text-2xl font-semibold">
      {VIEW_TO_TITLE[(getParam('view') ?? 'b') as Views]}
    </h3>
  );
};
