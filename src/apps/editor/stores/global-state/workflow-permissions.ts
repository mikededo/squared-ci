import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowPermissionsStore } from './types';

export const worfklowPermissionsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowPermissionsStore
> = (set, get) => ({
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
  togglePermission: (permission, status) => {
    const { permissions, totalPermissionsEnabled } = get();
    const permissionState = permissions[permission];
    // Disable all if none is enabled
    if (status === 'none' && !permissionState.none) {
      set({
        permissions: {
          ...permissions,
          [permission]: { none: true, read: false, write: false },
        },
        readAll: false,
        disableAll: false,
        writeAll: false,
        totalPermissionsEnabled: get().totalPermissionsEnabled + 1,
      });
    }

    const isOneAlreadyEnabled = Object.values(permissionState).some(
      (value) => value,
    );
    set({
      permissions: {
        ...permissions,
        [permission]: { [status]: !permissionState[status] },
      },
      readAll: false,
      disableAll: false,
      writeAll: false,
      totalPermissionsEnabled:
        totalPermissionsEnabled +
        (!permissionState[status] ? (isOneAlreadyEnabled ? 0 : 1) : -1),
    });
  },
  toggleReadAll: () => {
    const { readAll, permissions } = get();
    const permissionList = Object.keys(permissions);

    set({
      permissions: permissionList.reduce(
        (permissions, permission) => ({
          ...permissions,
          [permission]: { none: false, read: !readAll, write: false },
        }),
        {} as WorkflowPermissionsStore['permissions'],
      ),
      readAll: !readAll,
      disableAll: false,
      writeAll: false,
      totalPermissionsEnabled: !readAll ? permissionList.length : 0,
    });
  },
  toggleWriteAll: () => {
    const { writeAll, permissions } = get();
    const permissionList = Object.keys(permissions);

    set({
      permissions: permissionList.reduce(
        (permissions, permission) => ({
          ...permissions,
          [permission]: { none: false, read: false, write: !writeAll },
        }),
        {} as WorkflowPermissionsStore['permissions'],
      ),
      writeAll: !writeAll,
      disableAll: false,
      readAll: false,
      totalPermissionsEnabled: !writeAll ? permissionList.length : 0,
    });
  },
  toggleDisableAll: () => {
    const { disableAll, permissions } = get();
    const permissionList = Object.keys(permissions);

    set({
      permissions: permissionList.reduce(
        (permissions, permission) => ({
          ...permissions,
          [permission]: { none: !disableAll, read: false, write: false },
        }),
        {} as WorkflowPermissionsStore['permissions'],
      ),
      disableAll: !disableAll,
      readAll: false,
      writeAll: false,
      totalPermissionsEnabled: !disableAll ? permissionList.length : 0,
    });
  },
});
