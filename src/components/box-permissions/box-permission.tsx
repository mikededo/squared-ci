import React from 'react';

import { Row } from '@/sd';

import { PermissionButton } from './box-permission-button';

type Props = { permission: string };

export const Permission: React.FC<Props> = ({ permission }) => (
  <Row justify="between" variant="lg">
    <p className="text-mono text-sm text-slate-500 dark:text-slate-300">
      {permission}
    </p>
    <Row justify="end" variant="sm">
      <PermissionButton text="read" />
      <PermissionButton text="write" active />
      <PermissionButton text="none" />
    </Row>
  </Row>
);
