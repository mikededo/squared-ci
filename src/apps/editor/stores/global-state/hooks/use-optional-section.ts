import type { OptionalSections } from '@/editor/domain/optional-sections';

import { globalStore } from './global-store';
import type { Empty } from '../types';

export const useOptionalSection = <OS extends OptionalSections>(
  os: OS,
): { [key in OS]: boolean } & { toggleOS: Empty } =>
  globalStore(
    ({ toggleOS, ...state }) =>
      ({
        [os]: state[os],
        toggleOS: () => {
          toggleOS(os);
        },
      }) as never,
  );
