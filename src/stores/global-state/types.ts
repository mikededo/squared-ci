type WorkflowBasicsState = {
  name?: string;
  runName?: string;
};
type WorkflowBasicsActions = {
  onChangeName: (value: string) => void;
  onChangeRunName: (value: string) => void;
};
export type WorkflowBasicsStore = WorkflowBasicsState & WorkflowBasicsActions;

export type GlobalStore = WorkflowBasicsStore;
