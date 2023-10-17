import { globalStore } from './global-store';

export const useWorkflowDefaults = () =>
  globalStore(({ defaults, onChangeDefaultsMatrix: onChangeMatrix }) => ({
    defaults,
    onChangeMatrix,
  }));
