import type {
  PermissionStatus,
  Permissions,
  WorkflowPermissionsState,
} from '@/editor/domain/permissions';

import type { Double, Empty } from './shared';

export type WorkflowPermissionsActions = {
  togglePermission: Double<Permissions, PermissionStatus>;
  toggleReadAll: Empty;
  toggleWriteAll: Empty;
  toggleDisableAll: Empty;
};
export type WorkflowPermissionsStore = WorkflowPermissionsState &
  WorkflowPermissionsActions;
