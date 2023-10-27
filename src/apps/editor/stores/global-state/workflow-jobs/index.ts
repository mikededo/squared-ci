import type { StateCreator } from 'zustand';

import type {
  GlobalStore,
  WorkflowJobsBaseActions,
  WorkflowJobsStore,
} from '../types';

const workflowBase: StateCreator<
  GlobalStore,
  [],
  [],
  Pick<WorkflowJobsBaseActions, 'onChangeJobName'>
> = (set, get) => ({
  onChangeJobName: (jobId) => (jobName) => {
    const jobs = new Map([...get().jobs]);
    const current = jobs.get(jobId);
    if (!current) {
      return;
    }

    current.name = jobName;
    set({ jobs });
  },
});

export const workflowJobsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsStore
> = (set, get, ...rest) => ({
  jobs: new Map(),
  onAddJob: (id) => {
    const jobs = new Map([...get().jobs]);
    jobs.set(id, { id: id, name: '' });
    set({ jobs });
  },
  ...workflowBase(set, get, ...rest),
});
