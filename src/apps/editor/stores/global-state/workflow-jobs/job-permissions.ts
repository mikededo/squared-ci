import type { StateCreator } from 'zustand';

import {
  toggleDisableAll,
  togglePermission,
  toggleReadAll,
  toggleWriteAll,
} from '../helpers';
import type { GlobalStore, WorkflowJobsPermissionsActions } from '../types';

export const jobPermissions: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsPermissionsActions
> = (set, get) => ({
  onToggleJobPermission: (jobId) => (permission, status) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.permissions = togglePermission(permission, status, {
      permissions: current.permissions.permissions,
      total: current.permissions.totalPermissionsEnabled,
    });
    set({ jobs: updated });
  },
  onToggleJobPermissionReadAll: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.permissions = toggleReadAll({
      permissions: current.permissions.permissions,
      readAll: current.permissions.readAll,
    });
    set({ jobs: updated });
  },
  onToggleJobPermissionWriteAll: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.permissions = toggleWriteAll({
      permissions: current.permissions.permissions,
      writeAll: current.permissions.writeAll,
    });
    set({ jobs: updated });
  },
  onToggleJobPermissionDisableAll: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.permissions = toggleDisableAll({
      permissions: current.permissions.permissions,
      disableAll: current.permissions.disableAll,
    });
    set({ jobs: updated });
  },
});
