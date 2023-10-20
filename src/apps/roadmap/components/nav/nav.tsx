import React from 'react';

import { DarkModeToggler, Row } from '@/aero';

export const Nav: React.FC = () => (
  <Row
    as="nav"
    align="center"
    justify="center"
    className="px-6 border-b border-slate-150 h-12 z-10 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 inset-0 "
  >
    <p className="self-center text-sm uppercase text-center sm:text-left font-semibold">
      Roadmap
    </p>
    <DarkModeToggler />
  </Row>
);
