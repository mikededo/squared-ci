import type { StateCreator } from 'zustand';

import type {
  GlobalStore,
  Job,
  WorkflowJobsEnvironmentActions,
  WorkflowJobsState,
} from '../types';

type ChangeJobEnvironmentValueOptions = {
  jobs: WorkflowJobsState['jobs'];
  jobId: string;
  value: string;
};

const changeJobEnvironmentValue = (
  prop: keyof Job['environment'],
  { jobs, jobId, value }: ChangeJobEnvironmentValueOptions,
) => {
  const updated = new Map([...jobs]);
  const current = updated.get(jobId)!;
  current.environment[prop] = value;
  return updated;
};

export const workflowEnvironment: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsEnvironmentActions
> = (set, get) => ({
  onChangeJobEnvironmentName: (jobId) => (value) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    set({ jobs: changeJobEnvironmentValue('name', { jobs, jobId, value }) });
  },
  onChangeJobEnvironmentUrl: (jobId) => (value) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    set({ jobs: changeJobEnvironmentValue('url', { jobs, jobId, value }) });
  },
});
