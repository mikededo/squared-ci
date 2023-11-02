import type { StateCreator } from 'zustand';

import {
  INITIAL_PERMISSIONS_STATE,
  toggleDisableAll,
  togglePermission,
  toggleReadAll,
  toggleWriteAll,
} from './helpers';
import type { GlobalStore, WorkflowPermissionsStore } from './types';

export const worfklowPermissionsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowPermissionsStore
> = (set, get) => ({
  ...INITIAL_PERMISSIONS_STATE,
  togglePermission: (permission, status) => {
    const { permissions, totalPermissionsEnabled } = get();
    set({
      ...togglePermission(permission, status, {
        permissions,
        total: totalPermissionsEnabled,
      }),
    });
  },
  toggleReadAll: () => {
    const { readAll, permissions } = get();

    set({ ...toggleReadAll({ readAll, permissions }) });
  },
  toggleWriteAll: () => {
    const { writeAll, permissions } = get();
    set({ ...toggleWriteAll({ writeAll, permissions }) });
  },
  toggleDisableAll: () => {
    const { disableAll, permissions } = get();
    set({ ...toggleDisableAll({ disableAll, permissions }) });
  },
});
