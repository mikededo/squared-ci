import { globalStore } from './global-store';

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
