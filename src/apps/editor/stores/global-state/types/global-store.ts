import type { GlobalDragStore } from './global-drag-store';
import type { WorkflowBasicsStore } from './workflow-basics';
import type { WorkflowConcurrencyStore } from './workflow-concurrency';
import type { WorkflowDefaultsStore } from './workflow-defaults';
import type { WorkflowEnvStore } from './workflow-env';
import type { WorkflowInfoStore } from './workflow-info';
import type { WorkflowPermissionsStore } from './workflow-permissions';
import type { WorkflowTriggersStore } from './workflow-triggers';
import type { FeatureSwitchesStore } from '../feature-switches';
import type { OptionalSectionsStore } from '../optional-sections';

export type GlobalStore = FeatureSwitchesStore &
  OptionalSectionsStore &
  GlobalDragStore &
  WorkflowInfoStore &
  WorkflowBasicsStore &
  WorkflowTriggersStore &
  WorkflowPermissionsStore &
  WorkflowEnvStore &
  WorkflowConcurrencyStore &
  WorkflowDefaultsStore;
