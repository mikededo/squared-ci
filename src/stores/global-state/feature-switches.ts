import type { StateCreator } from 'zustand';

import type { FeatureSwitchesStore, GlobalStore } from './types';

export const featureSwitchesStore: StateCreator<
  GlobalStore,
  [],
  [],
  FeatureSwitchesStore
> = (set) => ({
  fsGlobalDrag: false,
  toggleFS: (key) => {
    set((state) => ({ [key]: !state[key] }));
  },
});
