import type { StateCreator } from 'zustand';

import type { GlobalStore, Single } from './types';

export type FeatureSwitchesState = {
  fsGlobalDrag: boolean;
  fsDarkTheme: boolean;
};
type FeatureSwitchesActions = {
  toggleFS: Single<keyof FeatureSwitchesState>;
};
export type FeatureSwitchesStore = FeatureSwitchesState &
  FeatureSwitchesActions;

export const featureSwitchesStore: StateCreator<
  GlobalStore,
  [],
  [],
  FeatureSwitchesStore
> = (set) => ({
  fsGlobalDrag: false,
  fsDarkTheme: false,
  toggleFS: (key) => {
    set((state) => ({ [key]: !state[key] }));
  },
});
