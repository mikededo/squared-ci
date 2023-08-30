import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowBasicsStore } from './types';

export const workflowBasicsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowBasicsStore
> = (set, get) => ({
  basics: {
    name: '',
    runName: '',
  },
  onChangeBasicsName: (name) => {
    set({ basics: { ...get().basics, name } });
  },
  onChangeBasicsRunName: (runName) => {
    set({ basics: { ...get().basics, runName } });
  },
});
