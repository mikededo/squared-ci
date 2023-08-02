import React from 'react';

import type { PermissionStatus, Permissions } from '@/domain/permissions';
import { Row } from '@/sd';

import { PermissionButton } from './box-permission-button';

type Props = {
  permission: Permissions;
  statuses: Record<PermissionStatus, boolean>;
  onClick: (permission: Permissions, status: PermissionStatus) => void;
};

export const Permission: React.FC<Props> = ({
  permission,
  statuses: { read, write, none },
  onClick,
}) => {
  const handleOnClick = (status: PermissionStatus) => {
    onClick(permission, status);
  };

  return (
    <Row justify="between" variant="lg">
      <p className="text-sm">{permission}</p>
      <Row justify="end" variant="sm">
        <PermissionButton status="read" onClick={handleOnClick} active={read} />
        <PermissionButton
          status="write"
          onClick={handleOnClick}
          active={write}
        />
        <PermissionButton status="none" onClick={handleOnClick} active={none} />
      </Row>
    </Row>
  );
};
