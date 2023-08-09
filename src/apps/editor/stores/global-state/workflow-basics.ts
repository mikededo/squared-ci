import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowBasicsStore } from './types';

export const workflowBasicsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowBasicsStore
> = (set) => ({
  name: undefined,
  runName: undefined,
  onChangeName: (value) => {
    set({ name: value === '' ? undefined : value });
  },
  onChangeRunName: (value) => {
    set({ runName: value === '' ? undefined : value });
  },
});
