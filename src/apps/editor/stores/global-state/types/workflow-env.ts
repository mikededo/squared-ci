import type { Single } from './shared';

export type WorkflowEnvState = { variables: Set<string> };
export type WorkflowEnvActions = {
  /** Variable should be a valid KEY=VALUE environment variable. The parsing
   * of the variable should be done in the store. However, the expected format
   * should be validated in the component (basically to include the equal).
   */
  addVariable: Single<string>;
  deleteVariable: Single<string>;
};
export type WorkflowEnvStore = WorkflowEnvState & WorkflowEnvActions;
