import type { Single } from './shared';

type WorkflowInfoState = {
  info: {
    fileName: string;
  };
};
type WorkflowInfoActions = {
  onChangeInfoFileName: Single<string>;
};
export type WorkflowInfoStore = WorkflowInfoState & WorkflowInfoActions;
