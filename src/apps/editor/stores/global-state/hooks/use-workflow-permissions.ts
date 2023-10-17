import { globalStore } from './global-store';

export const useWorkflowPermissions = () =>
  globalStore(
    ({
      permissions,
      writeAll,
      readAll,
      disableAll,
      totalPermissionsEnabled,
      togglePermission,
      toggleDisableAll,
      toggleWriteAll,
      toggleReadAll,
    }) => ({
      permissions,
      writeAll,
      readAll,
      disableAll,
      totalPermissionsEnabled,
      togglePermission,
      toggleDisableAll,
      toggleWriteAll,
      toggleReadAll,
    }),
  );
