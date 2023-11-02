import type {
  PermissionStatus,
  Permissions,
  PermissionsState,
} from '@/editor/domain/permissions';

export const INITIAL_PERMISSIONS_STATE = {
  permissions: {
    actions: { none: false, read: false, write: false },
    checks: { none: false, read: false, write: false },
    contents: { none: false, read: false, write: false },
    deployments: { none: false, read: false, write: false },
    discussions: { none: false, read: false, write: false },
    'id-token': { none: false, read: false, write: false },
    issues: { none: false, read: false, write: false },
    packages: { none: false, read: false, write: false },
    pages: { none: false, read: false, write: false },
    'pull-requests': { none: false, read: false, write: false },
    'repository-projects': { none: false, read: false, write: false },
    'security-events': { none: false, read: false, write: false },
    statuses: { none: false, read: false, write: false },
  },
  readAll: false,
  writeAll: false,
  disableAll: false,
  totalPermissionsEnabled: 0,
};

type TogglePermissionState = {
  permissions: PermissionsState;
  total: number;
};

export const togglePermission = (
  permission: Permissions,
  status: PermissionStatus,
  { permissions, total }: TogglePermissionState,
) => {
  const permissionState = permissions[permission];
  // Disable all if none is enabled
  if (status === 'none' && !permissionState.none) {
    return {
      permissions: {
        ...permissions,
        [permission]: { none: true, read: false, write: false },
      },
      readAll: false,
      disableAll: false,
      writeAll: false,
      totalPermissionsEnabled: total + 1,
    };
  }

  const isOneAlreadyEnabled = Object.values(permissionState).some(
    (value) => value,
  );

  return {
    permissions: {
      ...permissions,
      [permission]: { [status]: !permissionState[status] },
    },
    readAll: false,
    disableAll: false,
    writeAll: false,
    totalPermissionsEnabled:
      total + (!permissionState[status] ? (isOneAlreadyEnabled ? 0 : 1) : -1),
  };
};

type ToggleReadAllState = {
  readAll: boolean;
  permissions: PermissionsState;
};

export const toggleReadAll = ({ readAll, permissions }: ToggleReadAllState) => {
  const permissionList = Object.keys(permissions);

  return {
    permissions: permissionList.reduce(
      (permissions, permission) => ({
        ...permissions,
        [permission]: { none: false, read: !readAll, write: false },
      }),
      {} as PermissionsState,
    ),
    readAll: !readAll,
    disableAll: false,
    writeAll: false,
    totalPermissionsEnabled: !readAll ? permissionList.length : 0,
  };
};

type ToggleWriteAllState = {
  writeAll: boolean;
  permissions: PermissionsState;
};

export const toggleWriteAll = ({
  writeAll,
  permissions,
}: ToggleWriteAllState) => {
  const permissionList = Object.keys(permissions);

  return {
    permissions: permissionList.reduce(
      (permissions, permission) => ({
        ...permissions,
        [permission]: { none: false, read: false, write: !writeAll },
      }),
      {} as PermissionsState,
    ),
    writeAll: !writeAll,
    disableAll: false,
    readAll: false,
    totalPermissionsEnabled: !writeAll ? permissionList.length : 0,
  };
};

type ToggleDisableAllState = {
  disableAll: boolean;
  permissions: PermissionsState;
};

export const toggleDisableAll = ({
  disableAll,
  permissions,
}: ToggleDisableAllState) => {
  const permissionList = Object.keys(permissions);

  return {
    permissions: permissionList.reduce(
      (permissions, permission) => ({
        ...permissions,
        [permission]: { none: !disableAll, read: false, write: false },
      }),
      {} as PermissionsState,
    ),
    disableAll: !disableAll,
    readAll: false,
    writeAll: false,
    totalPermissionsEnabled: !disableAll ? permissionList.length : 0,
  };
};
