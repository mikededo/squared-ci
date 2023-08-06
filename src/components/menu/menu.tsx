import React from 'react';

import { Row } from '@/sd';

import { DarkThemeMenuOption, OptionalSectionsMenuOption } from './options';

export const Menu: React.FC = () => (
  <Row
    className="fixed transition-all left-1/2 -translate-x-1/2 top-6 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-400 rounded-lg"
    variant="md"
  >
    <OptionalSectionsMenuOption />
    <DarkThemeMenuOption />
  </Row>
);
