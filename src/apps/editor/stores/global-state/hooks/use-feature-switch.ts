import type { FeatureSwitches } from '@/editor/domain/feature-switches';

import { globalStore } from './global-store';
import type { Empty } from '../types';

export const useFeatureSwitch = <FS extends FeatureSwitches>(
  fs: FS,
): { [key in FS]: boolean } & { toggleFS: Empty } =>
  globalStore(
    ({ toggleFS, ...state }) =>
      ({
        [fs]: state[fs],
        toggleFS: () => {
          toggleFS(fs);
        },
      }) as never,
  );
export const useActiveFSCount = () =>
  globalStore(({ activeFSCount }) => activeFSCount);
