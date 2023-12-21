import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsConcurrencyActions } from '../types';

export const jobConcurrency: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsConcurrencyActions
> = (set, get) => ({
  onChangeJobConcurrencyGroup: (jobId) => (group) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.concurrency.group = group;
    set({ jobs: updated });
  },
  onToggleJobConcurrencyCIP: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.concurrency.cancelInProgress =
      !current.concurrency.cancelInProgress;
    set({ jobs: updated });
  },
});
