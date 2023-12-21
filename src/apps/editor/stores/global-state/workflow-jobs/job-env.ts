import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsEnvActions } from '../types';

export const jobEnv: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsEnvActions
> = (set, get) => ({
  onAddJobEnvVariable:
    (jobId) =>
    (...entry) => {
      const { jobs } = get();
      if (!jobs.has(jobId)) {
        return;
      }

      const updated = new Map(jobs);
      const current = updated.get(jobId)!;
      current.env.set(...entry);
      set({ jobs: updated });
    },
  onDeleteJobEnvVariable: (jobId) => (key) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.env.delete(key);
    set({ jobs: updated });
  },
});
