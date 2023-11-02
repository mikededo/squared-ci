import React from 'react';

import { Row } from '@/aero';
import type {
  PermissionStatus,
  Permissions,
} from '@/editor/domain/permissions';

import { PermissionButton } from '../permission-button';

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
        <PermissionButton
          status="read"
          onClick={handleOnClick}
          active={read}
          condensed
        />
        <PermissionButton
          status="write"
          onClick={handleOnClick}
          active={write}
          condensed
        />
        <PermissionButton
          status="none"
          onClick={handleOnClick}
          active={none}
          condensed
        />
      </Row>
    </Row>
  );
};
