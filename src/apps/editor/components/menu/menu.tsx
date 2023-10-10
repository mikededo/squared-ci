import React from 'react';

import { Row } from '@/aero';

import {
  DarkThemeMenuOption,
  OptionalSectionsMenuOption,
  ShowTriggers,
} from './options';

export const Menu: React.FC = () => (
  <Row
    className="fixed transition-all left-1/2 -translate-x-1/2 top-6 bg-card p-2 border rounded-lg"
    variant="md"
  >
    <OptionalSectionsMenuOption />
    <DarkThemeMenuOption />
    <ShowTriggers />
  </Row>
);
