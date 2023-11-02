import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsWithActions } from '../types';

export const jobWith: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsWithActions
> = (set, get) => ({
  onAddJobWithEntry:
    (jobId) =>
    ([key, value]) => {
      const { jobs } = get();
      if (!jobs.has(jobId)) {
        return;
      }

      const updated = new Map(jobs);
      const current = updated.get(jobId)!;
      current.with.set(key, value);
      set({ jobs: updated });
    },
  onRemoveJobWithEntry: (jobId) => (key) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.with.delete(key);
    set({ jobs: updated });
  },
});
