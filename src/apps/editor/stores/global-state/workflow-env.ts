import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowEnvStore } from './types';

export const workflowEnvStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowEnvStore
> = (set, get) => ({
  variables: new Set(),
  addVariable: (variable) => {
    // Parse the variabl
    const [name, value] = variable.split('=');

    // Name parsing
    const parsedName = name.replaceAll(' ', '_').toUpperCase().trim();
    // Value parsing
    const hasSpaces = value.includes(' ');
    const parsedValue = (hasSpaces ? `"${value}"` : value).trim();
    set({
      variables: new Set([...get().variables, `${parsedName}=${parsedValue}`]),
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
