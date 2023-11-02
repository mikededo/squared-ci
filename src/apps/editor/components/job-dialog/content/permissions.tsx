import React from 'react';

import { Divider, Label, Row, Toggle, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import type {
  PermissionStatus,
  Permissions,
} from '@/editor/domain/permissions';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobPermissions } from '@/editor/stores';

import { Section, SectionHeader } from './shared';
import { PermissionButton } from '../../permission-button';

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
    <Row justify="between" align="center" variant="lg">
      <p>{permission}</p>
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

export const PermissionsContent: React.FC = () => {
  const jobId = useSelectedJobId();
  const {
    permissions,
    readAll,
    writeAll,
    disableAll,
    onTogglePermission,
    onToggleReadAll,
    onToggleWriteAll,
    onToggleDisableAll,
  } = useJobPermissions(jobId ?? '');

  return (
    <Section>
      <SectionHeader
        title="Permissions"
        docs={JobDocs.jobPermissions}
        subtitle="Specify the permissions allowed to the GITHUB_TOKEN for this job."
      />
      <VCol align="between" variant="lg" expand>
        <Toggle text="Read all" value={!!readAll} onClick={onToggleReadAll} />
        <Toggle
          text="Write all"
          value={!!writeAll}
          onClick={onToggleWriteAll}
        />
        <Toggle
          text="Disable all"
          value={!!disableAll}
          onClick={onToggleDisableAll}
        />
        <Divider className="my-2" />
        <Label>You can also opt for a granular permission specification</Label>
        {Object.entries(permissions ?? {}).map(([permission, statuses]) => (
          <Permission
            key={permission}
            permission={permission as Permissions}
            statuses={statuses}
            onClick={onTogglePermission}
          />
        ))}
      </VCol>
    </Section>
  );
};
