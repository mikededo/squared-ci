import React from 'react';

import { Row } from '@/aero';

export const Nav: React.FC = () => (
  <Row as="nav" align="center" className="px-6 border-b border-slate-150 h-12">
    <p className="font-semibold text-slate-700 uppercase">
      Squared <span className="text-indigo-500">CI</span>
    </p>
  </Row>
);
