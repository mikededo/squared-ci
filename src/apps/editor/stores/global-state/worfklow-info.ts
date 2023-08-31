import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowInfoStore } from './types';

export const workflowInfoStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowInfoStore
> = (set) => ({
  info: {
    fileName: 'action.yaml',
  },
  onChangeInfoFileName: (name) => {
    set({ info: { fileName: name } });
  },
});
