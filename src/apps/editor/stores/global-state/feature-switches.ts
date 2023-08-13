import type { StateCreator } from 'zustand';

import type { FeatureSwitches } from '@/editor/domain/feature-switches';
import { LS } from '@/editor/domain/local-storage';

import type { GlobalStore, Single } from './types';

type FeatureSwitchesState = {
  [FS in FeatureSwitches]: boolean;
};
type ExtraFeatureSwitchesState = { activeFSCount: number };
type FeatureSwitchesActions = {
  toggleFS: Single<keyof FeatureSwitchesState>;
};
export type FeatureSwitchesStore = FeatureSwitchesState &
  ExtraFeatureSwitchesState &
  FeatureSwitchesActions;

const FSKeys = new Set<FeatureSwitches>([
  'fsGlobalDrag',
  'fsDarkTheme',
  'fsCopyAction',
]);
const saveFSStateToLocalStorage = (
  updated: FeatureSwitches,
  state: FeatureSwitchesState,
) => {
  LS.set(
    'featureSwitches',
    [...FSKeys].reduce(
      (res, key) => ({
        ...res,
        [key]: key === updated ? !state[key] : state[key],
      }),
      {} as FeatureSwitchesState,
    ),
  );
};

export const featureSwitchesStore: StateCreator<
  GlobalStore,
  [],
  [],
  FeatureSwitchesStore
> = (set, get) => {
  const LSFeatureSwitches = LS.get('featureSwitches');

  return {
    fsGlobalDrag: LSFeatureSwitches?.fsGlobalDrag ?? false,
    fsDarkTheme: LSFeatureSwitches?.fsDarkTheme ?? false,
    fsCopyAction: LSFeatureSwitches?.fsCopyAction ?? false,
    fsConcurrency: LSFeatureSwitches?.fsConcurrency ?? false,
    activeFSCount: Object.values(LSFeatureSwitches ?? {}).reduce(
      (count, active) => count + +active,
      0,
    ),
    toggleFS: (key) => {
      const state = get();
      const value = !state[key];
      set({
        [key]: value,
        activeFSCount: state.activeFSCount + (value ? 1 : -1),
      });
      saveFSStateToLocalStorage(key, state);
    },
  };
};
