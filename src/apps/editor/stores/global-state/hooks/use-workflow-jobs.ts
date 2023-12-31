import type { Container } from '@/editor/domain/container';

import { globalStore } from './global-store';
import type { Single } from '../types';

export const useWorkflowJobs = () =>
  globalStore(({ jobs, onAddJob }) => ({
    jobs: [...jobs.keys()],
    onAddJob,
  }));

export const useJobName = (jobId: string) =>
  globalStore(({ jobs, onChangeJobName }) => ({
    job: jobs.get(jobId),
    onChangeJobName: onChangeJobName(jobId),
  }));

export const useJobNeeds = (jobId: string) =>
  globalStore(({ jobs, onToggleJobNeed }) => ({
    active: jobs.get(jobId)?.needs ?? new Set(),
    inactive: new Set(
      [...jobs.keys()].filter(
        (job) => job !== jobId && !jobs.get(jobId)?.needs.has(job),
      ),
    ),
    onToggleJobNeed: onToggleJobNeed(jobId),
  }));

export const useJobEnvironment = (jobId: string) =>
  globalStore(
    ({ jobs, onChangeJobEnvironmentName, onChangeJobEnvironmentUrl }) => ({
      environment: jobs.get(jobId)?.environment,
      onChangeName: onChangeJobEnvironmentName(jobId),
      onChangeUrl: onChangeJobEnvironmentUrl(jobId),
    }),
  );

export const useJobContinueOnError = (jobId: string) =>
  globalStore(({ jobs, onToggleJobContinueOnError }) => ({
    value: jobs.get(jobId)?.continueOnError,
    onToggle: onToggleJobContinueOnError(jobId),
  }));

export const useJobCondition = (jobId: string) =>
  globalStore(({ jobs, onChangeJobCondition }) => ({
    condition: jobs.get(jobId)?.condition,
    onChange: onChangeJobCondition(jobId),
  }));

export const useJobTimeoutMinutes = (jobId: string) =>
  globalStore(
    ({ jobs, onChangeJobTimeoutMinutes: onChangeTimeoutMinutes }) => ({
      minutes: jobs.get(jobId)?.timeoutMinutes,
      onChange: onChangeTimeoutMinutes(jobId),
    }),
  );

export const useJobUses = (jobId: string) =>
  globalStore(({ jobs, onChangeJobUses }) => ({
    uses: jobs.get(jobId)?.uses,
    onChange: onChangeJobUses(jobId),
  }));

export const useJobRunsOnGithubRunner = (jobId: string) =>
  globalStore(({ jobs, onChangeJobGithubRunner, onClearJobGithubRunner }) => ({
    runner: jobs.get(jobId)?.runsOn.githubRunner,
    onChange: onChangeJobGithubRunner(jobId),
    onClear: onClearJobGithubRunner(jobId),
  }));
export const useJobRunsOnCustom = (jobId: string) =>
  globalStore(
    ({ jobs, onToggleJobRunCustomValue, onClearJobRunCustomValue }) => ({
      custom: jobs.get(jobId)?.runsOn.custom,
      onToggle: onToggleJobRunCustomValue(jobId),
      onClear: onClearJobRunCustomValue(jobId),
    }),
  );
export const useJobRunsOnGroup = (jobId: string) =>
  globalStore(
    ({
      jobs,
      onChangeJobRunGroup,
      onChangeJobRunLabel,
      onClearJobRunGroup,
    }) => ({
      group: jobs.get(jobId)?.runsOn.group,
      onChangeGroup: onChangeJobRunGroup(jobId),
      onChangeLabel: onChangeJobRunLabel(jobId),
      onClear: onClearJobRunGroup(jobId),
    }),
  );
export const useJobRunsOnActive = (jobId: string) =>
  globalStore(({ jobs }): 'none' | 'github-runner' | 'group' | 'custom' => {
    const current = jobs.get(jobId)?.runsOn;
    if (!current) {
      return 'none';
    }
    if (current.githubRunner) {
      return 'github-runner';
    }
    if (current.group.group || current.group.label) {
      return 'group';
    }
    if (current.custom.size > 0) {
      return 'custom';
    }

    return 'none';
  });

export const useJobConcurrency = (jobId: string) =>
  globalStore(
    ({ jobs, onToggleJobConcurrencyCIP, onChangeJobConcurrencyGroup }) => ({
      ...(jobs.get(jobId)?.concurrency ?? {}),
      onChangeGroup: onChangeJobConcurrencyGroup(jobId),
      onToggleCIP: onToggleJobConcurrencyCIP(jobId),
    }),
  );

export const useJobsWith = (jobId: string) =>
  globalStore(({ jobs, onAddJobWithEntry, onRemoveJobWithEntry }) => ({
    enabled: !!jobs.get(jobId)?.uses,
    entries: jobs.get(jobId)?.with,
    onAdd: onAddJobWithEntry(jobId),
    onRemove: onRemoveJobWithEntry(jobId),
  }));

export const useJobPermissions = (jobId: string) =>
  globalStore(
    ({
      jobs,
      onToggleJobPermissionDisableAll,
      onToggleJobPermissionWriteAll,
      onToggleJobPermissionReadAll,
      onToggleJobPermission,
    }) => ({
      ...(jobs.get(jobId)?.permissions ?? {}),
      onTogglePermission: onToggleJobPermission(jobId),
      onToggleReadAll: onToggleJobPermissionReadAll(jobId),
      onToggleWriteAll: onToggleJobPermissionWriteAll(jobId),
      onToggleDisableAll: onToggleJobPermissionDisableAll(jobId),
    }),
  );

export const useJobEnv = (jobId: string) =>
  globalStore(({ jobs, onAddJobEnvVariable, onDeleteJobEnvVariable }) => ({
    env: jobs.get(jobId)?.env,
    onAddEnv: onAddJobEnvVariable(jobId),
    onDeleteEnv: onDeleteJobEnvVariable(jobId),
  }));

export const useJobContainerImage = (jobId: string) =>
  globalStore(({ jobs, onChangeJobContainerImage }) => ({
    image: jobs.get(jobId)?.container.image,
    onChange: onChangeJobContainerImage(jobId),
  }));
export const useJobContainerCredentials = (jobId: string) =>
  globalStore(
    ({
      jobs,
      onChangeJobContainerCredentialsName,
      onChangeJobContainerCredentialsPassword,
    }) => ({
      credentials: jobs.get(jobId)?.container.credentials,
      onChangeName: onChangeJobContainerCredentialsName(jobId),
      onChangePassword: onChangeJobContainerCredentialsPassword(jobId),
    }),
  );
type ContainerSets = keyof Pick<
  Container,
  'options' | 'volumes' | 'ports' | 'env'
>;
type CapitalizedContainerSets = Capitalize<ContainerSets>;
export const useJobContainerSet = <S extends ContainerSets>(
  jobId: string,
  key: S,
): { [key in S]: Set<string> | undefined } & {
  onAdd: Single<string, Single<string>>;
  onDelete: Single<string, Single<string>>;
} =>
  globalStore(({ jobs, ...state }) => {
    const capitalizedKey = (key.charAt(0).toUpperCase() +
      key.slice(1)) as CapitalizedContainerSets;
    const onAddKey = `onAddJobContainer${capitalizedKey}` as const;
    const onDeleteKey = `onDeleteJobContainer${capitalizedKey}` as const;

    return {
      [key]: jobs.get(jobId)?.container[key],
      onAdd: state[onAddKey](jobId),
      onDelete: state[onDeleteKey](jobId),
    } as never;
  });
