import React from 'react';

import { DarkThemeMenuOption } from './options';

export const Menu: React.FC = () => (
  <div className="fixed transition-all left-1/2 top-4 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-400 rounded-lg">
    <DarkThemeMenuOption />
  </div>
);
