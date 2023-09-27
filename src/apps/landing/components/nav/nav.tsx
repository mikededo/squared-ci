import React from 'react';

import { Row } from '@/aero';

import { DarkModeToggler } from '../dark-mode';

export const Nav: React.FC = () => (
  <Row
    as="nav"
    align="center"
    justify="center"
    className="px-6 border-b border-slate-150 h-12 z-10"
  >
    {/* TODO: Add when page is finished
    <p className="font-semibold uppercase">
      Squared <span className="text-extra">CI</span>
    </p>
    */}
    <p className="self-center text-sm uppercase text-center sm:text-left font-semibold">
      🚧 This page is still under construction - The project is currently on
      stand by! 🚧
    </p>
    <DarkModeToggler />
  </Row>
);
