import React from 'react';

import { useSearchParam } from '@/chain';

import type { Views } from './types';

const VIEW_TO_CONTENT: Record<Views, React.ReactNode> = {
  b: <div>Base</div>,
  p: <div>Permissions</div>,
  coc: <div>Concurrency</div>,
  o: <div>Outputs</div>,
  e: <div>Env</div>,
  d: <div>Defaults</div>,
  ste: <div>Steps</div>,
  str: <div>Strategy</div>,
  con: <div>Container</div>,
  h: <div>Help</div>,
};

export const ContenSwitcher: React.FC = () => {
  const { getParam } = useSearchParam();

  return VIEW_TO_CONTENT[(getParam('view') ?? 'b') as Views];
};
