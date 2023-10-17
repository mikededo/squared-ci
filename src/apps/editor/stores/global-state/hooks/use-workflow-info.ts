import { globalStore } from './global-store';

export const useWorkflowInfoStore = () =>
  globalStore(({ info, onChangeInfoFileName }) => ({
    info,
    onChangeFileName: onChangeInfoFileName,
  }));
