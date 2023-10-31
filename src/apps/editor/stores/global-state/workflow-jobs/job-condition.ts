import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsConditionActions } from '../types';

export const jobCondition: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsConditionActions
> = (set, get) => ({
  onChangeJobCondition: (jobId) => (condition) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.condition = condition;
    set({ jobs: updated });
  },
});
