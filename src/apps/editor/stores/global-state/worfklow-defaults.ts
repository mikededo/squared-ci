import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowDefaultsStore } from './types';

export const workflowDefaultsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowDefaultsStore
> = (set, get) => ({
  defaults: {
    matrix: [],
  },
  onChangeDefaultsMatrix: (matrix) => {
    const { defaults } = get();
    set({ defaults: { ...defaults, matrix } });
  },
});
