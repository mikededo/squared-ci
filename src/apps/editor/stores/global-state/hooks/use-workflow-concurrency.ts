import { globalStore } from './global-store';

export const useWorkflowConcurrency = () =>
  globalStore(
    ({
      concurrency,
      toggleConcurrencyCancelInProgress: toggleCancelInProgress,
      onChangeConcurrencyMax: onChangeMax,
      onChangeBasicsName: onChangeName,
      onChangeConcurrencyGroup: onChangeGroup,
      onChangeConcurrencyMatrix: onChangeMatrix,
    }) => ({
      concurrency,
      toggleCancelInProgress,
      onChangeMax,
      onChangeName,
      onChangeGroup,
      onChangeMatrix,
    }),
  );
