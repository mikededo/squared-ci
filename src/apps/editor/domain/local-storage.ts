import type { Maybe } from '@/pulse';

import type { FeatureSwitches } from './feature-switches';
import type { OptionalSections } from './optional-sections';

export type ThemeModes = 'light' | 'dark';

export type LocalStorageData = {
  hideTriggers: boolean;
  featureSwitches: Record<FeatureSwitches, boolean>;
  optionalSections: Record<OptionalSections, boolean>;
  themeMode: ThemeModes;
  showNews: boolean;
};
export type LocalStorageKeys = keyof LocalStorageData;

const get = <Key extends LocalStorageKeys>(
  lsKey: Key,
): Maybe<LocalStorageData[Key]> => {
  if (typeof window === 'undefined') {
    return;
  }

  const value = window.localStorage.getItem(lsKey);
  if (value === null || value === undefined) {
    return value;
  }

  return JSON.parse(value) as Maybe<LocalStorageData[Key]>;
};

const set = <Key extends LocalStorageKeys>(
  lsKey: Key,
  lsData: LocalStorageData[Key],
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(lsKey, JSON.stringify(lsData));
};

export const LS = { set, get };
