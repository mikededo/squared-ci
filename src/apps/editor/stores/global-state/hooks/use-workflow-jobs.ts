import { globalStore } from './global-store';

export const useWorkflowJobs = () =>
  globalStore(({ jobs, onAddJob }) => ({
    jobs: [...jobs.keys()],
    onAddJob,
  }));

export const useWorkflowJobName = (jobId: string) =>
  globalStore(({ jobs, onChangeJobName }) => ({
    job: jobs.get(jobId),
    onChangeJobName: onChangeJobName(jobId),
  }));

export const useWorkflowNeeds = (jobId: string) =>
  globalStore(({ jobs, onToggleJobNeed }) => ({
    active: jobs.get(jobId)?.needs ?? new Set(),
    inactive: new Set(
      [...jobs.keys()].filter(
        (job) => job !== jobId && !jobs.get(jobId)?.needs.has(job),
      ),
    ),
    onToggleJobNeed: onToggleJobNeed(jobId),
  }));

export const useWorkflowEnvironment = (jobId: string) =>
  globalStore(
    ({ jobs, onChangeJobEnvironmentName, onChangeJobEnvironmentUrl }) => ({
      environment: jobs.get(jobId)?.environment,
      onChangeName: onChangeJobEnvironmentName(jobId),
      onChangeUrl: onChangeJobEnvironmentUrl(jobId),
    }),
  );
