import React from 'react';
import type { PropsWithChildren } from 'react';

import { Row } from '@/aero';

export const TagWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <Row justify="center" variant="none" className="flex-wrap gap-1.5" expand>
    {children}
  </Row>
);
