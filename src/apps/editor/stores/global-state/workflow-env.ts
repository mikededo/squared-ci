import type { StateCreator } from 'zustand';

import { addEnvVariable } from './helpers';
import type { GlobalStore, WorkflowEnvStore } from './types';

export const workflowEnvStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowEnvStore
> = (set, get) => ({
  variables: new Set(),
  addVariable: (variable) => {
    set({
      variables: new Set([...get().variables, addEnvVariable(variable)]),
    });
  },
  deleteVariable: (variable) => {
    const { variables } = get();
    if (!variables.has(variable)) {
      return;
    }

    const updated = new Set(variables);
    updated.delete(variable);
    set({ variables: updated });
  },
});
