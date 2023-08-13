import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowConcurrencyStore } from './types';

export const workflowConcurrencyStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowConcurrencyStore
> = (set, get) => ({
  concurrency: {
    cancelInProgress: false,
    group: '',
    max: 0,
  },
  toggleCancelInProgress: () => {
    const { concurrency } = get();
    set({
      concurrency: {
        ...concurrency,
        cancelInProgress: !concurrency.cancelInProgress,
      },
    });
  },
  onChangeGroup: (group) => {
    const { concurrency } = get();
    set({ concurrency: { ...concurrency, group } });
  },
  onChangeMax: (max) => {
    const { concurrency } = get();
    set({ concurrency: { ...concurrency, max } });
  },
});
