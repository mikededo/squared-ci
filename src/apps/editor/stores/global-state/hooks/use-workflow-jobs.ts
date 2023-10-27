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
