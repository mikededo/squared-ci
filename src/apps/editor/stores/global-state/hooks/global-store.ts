import { create } from 'zustand';

import { featureSwitchesStore } from '../feature-switches';
import { globalDragStore } from '../global-drag';
import { optionalSectionsStore } from '../optional-sections';
import type { GlobalStore } from '../types';
import { workflowDefaultsStore } from '../worfklow-defaults';
import { workflowInfoStore } from '../worfklow-info';
import { workflowBasicsStore } from '../workflow-basics';
import { workflowConcurrencyStore } from '../workflow-concurrency';
import { workflowEnvStore } from '../workflow-env';
import { workflowJobsStore } from '../workflow-jobs';
import { worfklowPermissionsStore } from '../workflow-permissions';
import { workflowTriggersStore } from '../workflow-triggers';

export const globalStore = create<GlobalStore>()((...args) => ({
  ...featureSwitchesStore(...args),
  ...optionalSectionsStore(...args),
  ...globalDragStore(...args),
  ...workflowInfoStore(...args),
  ...workflowBasicsStore(...args),
  ...workflowTriggersStore(...args),
  ...worfklowPermissionsStore(...args),
  ...workflowEnvStore(...args),
  ...workflowConcurrencyStore(...args),
  ...workflowDefaultsStore(...args),
  ...workflowJobsStore(...args),
}));
