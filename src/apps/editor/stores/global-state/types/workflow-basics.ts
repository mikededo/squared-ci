import type { Single } from './shared';

type WorkflowBasicsState = {
  basics: {
    name: string;
    runName: string;
  };
};
type WorkflowBasicsActions = {
  onChangeBasicsName: Single<string>;
  onChangeBasicsRunName: Single<string>;
};
export type WorkflowBasicsStore = WorkflowBasicsState & WorkflowBasicsActions;
