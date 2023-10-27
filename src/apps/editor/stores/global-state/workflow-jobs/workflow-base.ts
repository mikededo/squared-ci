import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsBaseActions } from '../types';

export const workflowBase: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsBaseActions
> = (set, get) => ({
  onChangeJobName: (jobId) => (jobName) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map([...jobs]);
    const current = updated.get(jobId)!;
    current.name = jobName;
    set({ jobs: updated });
  },
});
