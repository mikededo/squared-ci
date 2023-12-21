import React, { useMemo } from 'react';

import { useSearchParam } from '@/chain';

import type { Views } from './types';

const VIEW_TO_TITLE: Record<Views, string> = {
  b: 'Base',
  p: 'Permissions',
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

  // Memoize the value on each first render in order to avoid having
  // the title disappearing on closing the dialog (as the param it is removed
  // and useSearchParam is updated)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoParam = useMemo(() => getParam('job-editor'), []);

  return (
    <h3 className="p-4 text-2xl font-semibold line-clamp-1">
      {memoParam} - {VIEW_TO_TITLE[(getParam('view') ?? 'b') as Views]}
    </h3>
  );
};
