import { globalStore } from './global-store';

export const useWorkflowEnv = () =>
  globalStore(({ variables, addVariable, deleteVariable }) => ({
    variables,
    addVariable,
    deleteVariable,
  }));
