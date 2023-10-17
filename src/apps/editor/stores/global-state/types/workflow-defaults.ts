import type { YamlField } from '@/aero';

import type { Single } from './shared';

export type WorkflowDefaultsState = {
  defaults: {
    matrix: YamlField[];
  };
};
export type WorkflowDefaultsActions = {
  onChangeDefaultsMatrix: Single<YamlField[]>;
};
export type WorkflowDefaultsStore = WorkflowDefaultsState &
  WorkflowDefaultsActions;
