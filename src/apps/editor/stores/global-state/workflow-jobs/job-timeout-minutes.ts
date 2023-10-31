import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsTimeoutMinutesActions } from '../types';

export const jobTimeoutMinutes: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsTimeoutMinutesActions
> = (set, get) => ({
  onChangeTimeoutMinutes: (jobId) => (minutes) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.timeoutMinutes = minutes;
    set({ jobs: updated });
  },
});
