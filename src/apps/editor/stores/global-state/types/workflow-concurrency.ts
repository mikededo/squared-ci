import type { YamlField } from '@/aero';

import type { Empty, Single } from './shared';

export type WorkflowConcurrencyState = {
  concurrency: {
    name: string;
    cancelInProgress: boolean;
    group: string;
    max: number;
    matrix: YamlField[];
  };
};
export type WorkflowConcurrencyActions = {
  toggleConcurrencyCancelInProgress: Empty;
  onChangeConcurrencyName: Single<string>;
  onChangeConcurrencyGroup: Single<string>;
  onChangeConcurrencyMax: Single<number>;
  onChangeConcurrencyMatrix: Single<YamlField[]>;
};
export type WorkflowConcurrencyStore = WorkflowConcurrencyState &
  WorkflowConcurrencyActions;
