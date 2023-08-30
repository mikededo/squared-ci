import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowConcurrencyStore } from './types';

export const workflowConcurrencyStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowConcurrencyStore
> = (set, get) => ({
  concurrency: {
    name: '',
    cancelInProgress: false,
    group: '',
    max: 0,
    matrix: [],
  },
  toggleConcurrencyCancelInProgress: () => {
    const { concurrency } = get();
    set({
      concurrency: {
        ...concurrency,
        cancelInProgress: !concurrency.cancelInProgress,
      },
    });
  },
  onChangeConcurrencyName: (name) => {
    const { concurrency } = get();
    set({ concurrency: { ...concurrency, name } });
  },
  onChangeConcurrencyGroup: (group) => {
    const { concurrency } = get();
    set({ concurrency: { ...concurrency, group } });
  },
  onChangeConcurrencyMax: (max) => {
    const { concurrency } = get();
    set({ concurrency: { ...concurrency, max } });
  },
  onChangeConcurrencyMatrix: (matrix) => {
    const { concurrency } = get();
    set({ concurrency: { ...concurrency, matrix } });
  },
});
