import type {
  PermissionStatus,
  Permissions,
} from '@/editor/domain/permissions';

import type { Double, Empty } from './shared';

export type WorkflowPermissionsState = {
  totalPermissionsEnabled: number;
  permissions: {
    [K in Permissions]: Record<PermissionStatus, boolean>;
  };
  readAll: boolean;
  writeAll: boolean;
  disableAll: boolean;
};
export type WorkflowPermissionsActions = {
  togglePermission: Double<Permissions, PermissionStatus>;
  toggleReadAll: Empty;
  toggleWriteAll: Empty;
  toggleDisableAll: Empty;
};
export type WorkflowPermissionsStore = WorkflowPermissionsState &
  WorkflowPermissionsActions;
