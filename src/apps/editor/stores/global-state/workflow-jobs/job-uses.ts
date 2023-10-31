import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsUsesActions } from '../types';

export const jobUses: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsUsesActions
> = (set, get) => ({
  onChangeJobUses: (jobId) => (value) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.uses = value;
    set({ jobs: updated });
  },
});
