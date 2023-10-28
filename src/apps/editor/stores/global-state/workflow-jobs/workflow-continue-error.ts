import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsContinueOnErrorActions } from '../types';

export const workflowContinueOnError: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsContinueOnErrorActions
> = (set, get) => ({
  onToggleJobContinueOnError: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.continueOnError = !current.continueOnError;
    set({ jobs: updated });
  },
});
