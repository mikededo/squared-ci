import type { StateCreator } from 'zustand';

import { LS } from '@/editor/domain/local-storage';
import type { OptionalSections } from '@/editor/domain/optional-sections';

import type { GlobalStore, Single } from './types';

type OptionalSectionsState = {
  [OS in OptionalSections]: boolean;
};
type OptionalSectionsActions = {
  toggleOS: Single<keyof OptionalSectionsState>;
};
export type OptionalSectionsStore = OptionalSectionsState &
  OptionalSectionsActions;

const OSKeys = new Set<keyof OptionalSectionsState>([
  'osPermissions',
  'osEnv',
  'osDefaults',
  'osConcurrency',
]);
const saveOSStateToLocalStorage = (
  updated: OptionalSections,
  state: OptionalSectionsState,
) => {
  LS.set(
    'optionalSections',
    [...OSKeys].reduce(
      (res, key) => ({
        ...res,
        [key]: key === updated ? !state[key] : state[key],
      }),
      {} as OptionalSectionsState,
    ),
  );
};

export const optionalSectionsStore: StateCreator<
  GlobalStore,
  [],
  [],
  OptionalSectionsStore
> = (set, get) => {
  const LSOptionalSections = LS.get('optionalSections');

  return {
    osPermissions: LSOptionalSections?.osPermissions ?? false,
    osEnv: LSOptionalSections?.osEnv ?? false,
    osDefaults: LSOptionalSections?.osDefaults ?? false,
    osConcurrency: LSOptionalSections?.osDefaults ?? false,
    toggleOS: (key) => {
      const state = get();
      const value = !state[key];
      set({ [key]: value });
      saveOSStateToLocalStorage(key, state);
    },
  };
};
