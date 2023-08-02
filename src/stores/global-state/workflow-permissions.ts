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
  togglePermission: (permission, status) => {
    const permissionState = get().permissions[permission];
    // Disable all if none is enabled
    if (status === 'none' && !permissionState.none) {
      set({
        permissions: {
          ...get().permissions,
          [permission]: { none: true, read: false, write: false },
        },
      });
    }

    set({ [permission]: { [status]: !permissionState[status] } });
  },
});
