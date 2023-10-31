// This section is mostly sliced up, since the jobs
// section is really extens and complex

import type { YamlField } from '@/aero';
import type { Container } from '@/editor/domain/container';
import type {
  PermissionStatus,
  Permissions,
} from '@/editor/domain/permissions';

import type { Empty, Single } from './shared';

type JobPermissions = {
  totalPermissionsEnabled: number;
  permissions: {
    [K in Permissions]: Record<PermissionStatus, boolean>;
  };
  readAll: boolean;
  writeAll: boolean;
  disableAll: boolean;
};
type JobEnvironment = { name: string; url?: string };
type JobConcurrency = {
  name: string;
  cancelInProgress: boolean;
  group: string;
  max: number;
  matrix: YamlField[];
};
type JobRun = { shell: string; workingDirectory: string };
type JobSecrets = {
  inherit: boolean;
  secrets: Map<string, string>;
};

/**
 * Contains all the fields from a single job. Notice that there are some fields
 * that contain the same definition as their implementation for the global state.
 * The reason why I have opted to keep them separated is not to mix concerns,
 * which, even though it has the inconvenience of duplicated types, allows the
 * codebase to differentiate both sections, as they could indepently change
 */
export type Job = {
  id: string;
  name: string;
  permissions?: JobPermissions;
  needs: Set<string>;
  condition: string;
  runsOn?: never; // TBD
  environment: JobEnvironment;
  concurrency?: JobConcurrency;
  outputs?: Map<string, string>;
  env?: Map<string, string>;
  defaults?: YamlField[];
  run?: JobRun;
  steps?: never; // TBD
  timeoutMinutes: number;
  strategy?: YamlField[];
  continueOnError: boolean;
  container?: Container;
  services?: Map<string, Container>;
  uses?: string;
  with?: never; // TBD
  secrets?: JobSecrets;
};

// Action slices
export type WorkflowJobsBaseActions = {
  onChangeJobName: Single<string, Single<string>>;
};
export type WorkflowJobsNeedsActions = {
  onToggleJobNeed: Single<string, Single<string>>;
};
export type WorkflowJobsEnvironmentActions = {
  onChangeJobEnvironmentName: Single<string, Single<string>>;
  onChangeJobEnvironmentUrl: Single<string, Single<string>>;
};
export type WorkflowJobsContinueOnErrorActions = {
  onToggleJobContinueOnError: Single<string, Empty>;
};
export type WorkflowJobsConditionActions = {
  onChangeJobCondition: Single<string, Single<string>>;
};
export type WorkflowJobsTimeoutMinutesActions = {
  onChangeTimeoutMinutes: Single<string, Single<number>>;
};

export type WorkflowJobsState = { jobs: Map<string, Job> };
type WorkflowJobsActions = WorkflowJobsBaseActions &
  WorkflowJobsNeedsActions &
  WorkflowJobsEnvironmentActions &
  WorkflowJobsContinueOnErrorActions &
  WorkflowJobsConditionActions &
  WorkflowJobsTimeoutMinutesActions & { onAddJob: Single<string> };
export type WorkflowJobsStore = WorkflowJobsState & WorkflowJobsActions;
