import React from 'react';

import { Row } from '@/aero';

export const Nav: React.FC = () => (
  <Row
    as="nav"
    align="center"
    className="px-6 border-b border-slate-150 h-12 z-10"
  >
    <p className="font-semibold uppercase">
      Squared <span className="text-extra">CI</span>
    </p>
  </Row>
);
