import React from 'react';

import type { ExtraPermissionStatuses } from '@/domain/permissions';
import { Keyword, Line, Tabbed } from '@/sd/visualiser/keywords';
import { useWorkflowPermissions } from '@/stores';

type GlobalPermissionProps = {
  permission: ExtraPermissionStatuses;
};

const GlobalPermission: React.FC<GlobalPermissionProps> = ({ permission }) => (
  <Line>
    <Keyword>permissions</Keyword>: {permission}
  </Line>
);

export const WorkflowPermissions: React.FC = () => {
  const {
    permissions,
    disableAll,
    writeAll,
    readAll,
    totalPermissionsEnabled,
  } = useWorkflowPermissions();

  if (disableAll) {
    return <GlobalPermission permission="{}" />;
  }
  if (writeAll) {
    return <GlobalPermission permission="write-all" />;
  }
  if (readAll) {
    return <GlobalPermission permission="read-all" />;
  }

  return totalPermissionsEnabled > 0 ? (
    <>
      <Line>
        <Keyword>permissions</Keyword>:
      </Line>
      {Object.entries(permissions).map(([key, { none, read, write }]) =>
        read || write || none ? (
          <Tabbed key={key} tabs={1}>
            <Keyword>{key}</Keyword>: {read ? 'read' : write ? 'write' : 'none'}
          </Tabbed>
        ) : null
      )}
    </>
  ) : null;
};
