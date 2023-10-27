import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsNeedsActions } from '../types';

export const workflowNeeds: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsNeedsActions
> = (set, get) => ({
  onToggleJobNeed: (jobId) => (need) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map([...get().jobs]);
    const current = updated.get(jobId)!;
    if (current.needs.has(need)) {
      current.needs.delete(need);
    } else {
      current.needs.add(need);
    }

    set({ jobs: updated });
  },
});
