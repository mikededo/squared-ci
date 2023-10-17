import { globalStore } from './global-store';

export const useWorkflowBasicsStore = () =>
  globalStore(
    ({
      basics,
      // Use alias in order to simplify the name exported
      onChangeBasicsName: onChangeName,
      onChangeBasicsRunName: onChangeRunName,
    }) => ({
      basics,
      onChangeName,
      onChangeRunName,
    }),
  );
