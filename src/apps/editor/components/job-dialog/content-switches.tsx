import React from 'react';

import { useSearchParam } from '@/chain';

import { BaseContent, PermissionsContent } from './content';
import type { Views } from './types';

const VIEW_TO_CONTENT: Record<Views, React.ReactNode> = {
  b: <BaseContent />,
  p: <PermissionsContent />,
  coc: <div>Concurrency</div>,
  o: <div>Outputs</div>,
  e: <div>Env</div>,
  d: <div>Defaults</div>,
  ste: <div>Steps</div>,
  str: <div>Strategy</div>,
  con: <div>Container</div>,
  ser: <div>Services</div>,
  h: <div>Help</div>,
};

export const ContentSwitcher: React.FC = () => {
  const { getParam } = useSearchParam();

  return VIEW_TO_CONTENT[(getParam('view') ?? 'b') as Views];
};
