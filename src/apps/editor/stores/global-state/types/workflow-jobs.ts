// This section is mostly sliced up, since the jobs
// section is really extens and complex

import type { YamlField } from '@/aero';
import type { Container } from '@/editor/domain/container';
import type {
  PermissionStatus,
  Permissions,
} from '@/editor/domain/permissions';
import type { GitHubHostedRunners } from '@/editor/domain/runners';

import type { Double, Empty, Single } from './shared';

type JobPermissions = {
  totalPermissionsEnabled: number;
  permissions: {
    [K in Permissions]: Record<PermissionStatus, boolean>;
  };
  readAll: boolean;
  writeAll: boolean;
  disableAll: boolean;
};
/**
 * The runs-on property can be specified in different forms:
 * specifing the github runner, providing a set of variables that
 * will identify the runner to be used or using a key/value pair with
 * the group of the runner and a label.
 */
type JobRunsOn = {
  githubRunner?: GitHubHostedRunners;
  custom: Set<string>;
  group: { group: string; label: string };
};
type JobEnvironment = { name: string; url?: string };
type JobConcurrency = {
  cancelInProgress: boolean;
  group: string;
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
  permissions: JobPermissions;
  needs: Set<string>;
  condition: string;
  runsOn: JobRunsOn; // TBD
  environment: JobEnvironment;
  concurrency: JobConcurrency;
  outputs?: Map<string, string>;
  env: Map<string, string>;
  defaults?: YamlField[];
  run?: JobRun;
  steps?: never; // TBD
  timeoutMinutes: number;
  strategy?: YamlField[];
  continueOnError: boolean;
  container: Container;
  services?: Map<string, Container>;
  uses: string;
  with: Map<string, string>;
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
  onChangeJobTimeoutMinutes: Single<string, Single<number>>;
};
export type WorkflowJobsUsesActions = {
  onChangeJobUses: Single<string, Single<string>>;
};
export type WorkflowJobsConcurrencyActions = {
  onChangeJobConcurrencyGroup: Single<string, Single<string>>;
  onToggleJobConcurrencyCIP: Single<string, Empty>;
};
export type WorkflowJobsRunsOnActions = {
  onChangeJobGithubRunner: Single<string, Single<GitHubHostedRunners>>;
  onToggleJobRunCustomValue: Single<string, Single<string>>;
  onChangeJobRunGroup: Single<string, Single<string>>;
  onChangeJobRunLabel: Single<string, Single<string>>;
  // Clear events
  onClearJobGithubRunner: Single<string, Empty>;
  onClearJobRunCustomValue: Single<string, Empty>;
  onClearJobRunGroup: Single<string, Empty>;
};
export type WorkflowJobsWithActions = {
  onAddJobWithEntry: Single<string, Single<[key: string, value: string]>>;
  onRemoveJobWithEntry: Single<string, Single<string>>;
};
export type WorkflowJobsPermissionsActions = {
  onToggleJobPermission: Single<string, Double<Permissions, PermissionStatus>>;
  onToggleJobPermissionReadAll: Single<string, Empty>;
  onToggleJobPermissionWriteAll: Single<string, Empty>;
  onToggleJobPermissionDisableAll: Single<string, Empty>;
};
export type WorkflowJobsEnvActions = {
  onAddJobEnvVariable: Single<string, Double<string, string>>;
  onDeleteJobEnvVariable: Single<string, Single<string>>;
};
export type WorkflowJobsContainerActions = {
  onChangeJobContainerImage: Single<string, Single<string>>;
  onChangeJobContainerCredentialsName: Single<string, Single<string>>;
  onChangeJobContainerCredentialsPassword: Single<string, Single<string>>;
  onAddJobContainerEnv: Single<string, Single<string>>;
  onDeleteJobContainerEnv: Single<string, Single<string>>;
  onAddJobContainerPorts: Single<string, Single<string>>;
  onDeleteJobContainerPorts: Single<string, Single<string>>;
  onAddJobContainerVolumes: Single<string, Single<string>>;
  onDeleteJobContainerVolumes: Single<string, Single<string>>;
  onAddJobContainerOptions: Single<string, Single<string>>;
  onDeleteJobContainerOptions: Single<string, Single<string>>;
};

export type WorkflowJobsState = { jobs: Map<string, Job> };
type WorkflowJobsActions = WorkflowJobsBaseActions &
  WorkflowJobsNeedsActions &
  WorkflowJobsEnvironmentActions &
  WorkflowJobsContinueOnErrorActions &
  WorkflowJobsConditionActions &
  WorkflowJobsTimeoutMinutesActions &
  WorkflowJobsConcurrencyActions &
  WorkflowJobsUsesActions &
  WorkflowJobsRunsOnActions &
  WorkflowJobsWithActions &
  WorkflowJobsPermissionsActions &
  WorkflowJobsEnvActions &
  WorkflowJobsContainerActions & { onAddJob: Single<string> };
export type WorkflowJobsStore = WorkflowJobsState & WorkflowJobsActions;
