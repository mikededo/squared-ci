import { create } from 'zustand';

import type { FeatureSwitches } from '@/editor/domain/feature-switches';
import type { OptionalSections } from '@/editor/domain/optional-sections';

import { featureSwitchesStore } from './feature-switches';
import { globalDragStore } from './global-drag';
import { optionalSectionsStore } from './optional-sections';
import type { Empty, GlobalStore } from './types';
import { workflowInfoStore } from './worfklow-info';
import { workflowBasicsStore } from './workflow-basics';
import { workflowConcurrencyStore } from './workflow-concurrency';
import { workflowEnvStore } from './workflow-env';
import { worfklowPermissionsStore } from './workflow-permissions';
import { workflowTriggersStore } from './workflow-triggers';

const globalStore = create<GlobalStore>()((...args) => ({
  ...featureSwitchesStore(...args),
  ...optionalSectionsStore(...args),
  ...globalDragStore(...args),
  ...workflowInfoStore(...args),
  ...workflowBasicsStore(...args),
  ...workflowTriggersStore(...args),
  ...worfklowPermissionsStore(...args),
  ...workflowEnvStore(...args),
  ...workflowConcurrencyStore(...args),
}));

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

export const useGlobalDragNotifier = () =>
  globalStore(({ isDragging, onDragStart, onDragEnd, onDragChange }) => ({
    isDragging,
    onDragStart,
    onDragEnd,
    onDragChange,
  }));
export const useGlobalDragListener = () =>
  globalStore(({ x, y }) => ({ x, y }));

export const useWorkflowInfoStore = () =>
  globalStore(({ info, onChangeInfoFileName }) => ({
    info,
    onChangeFileName: onChangeInfoFileName,
  }));

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

export const useWorkflowTriggersStore = () =>
  globalStore(
    ({
      noneCustomization,
      typeCustomization,
      complexCustomization,
      cronCustomization,
      triggers,
      toggleNoneTrigger,
      getTriggerTypes,
      toggleTypeTrigger,
      toggleTypeTriggerProp,
      toggleComplexTrigger,
      toggleComplexTriggerPath,
      getComplexTriggerPaths,
      toggleComplexTriggerBranch,
      getComplexTriggerBranches,
      toggleComplexTriggerTag,
      getComplexTriggerTags,
      toggleCronTrigger,
    }) => ({
      noneCustomization,
      typeCustomization,
      complexCustomization,
      cronCustomization,
      triggers,
      toggleNoneTrigger,
      getTriggerTypes,
      toggleTypeTrigger,
      toggleTypeTriggerProp,
      toggleComplexTrigger,
      toggleComplexTriggerPath,
      getComplexTriggerPaths,
      toggleComplexTriggerBranch,
      getComplexTriggerBranches,
      toggleComplexTriggerTag,
      getComplexTriggerTags,
      toggleCronTrigger,
    }),
  );
export const useWorkflowCronTriggerStore = () =>
  globalStore(
    ({
      cronCustomization,
      onAddCronTriggerValue,
      onDeleteCronTriggerVaule,
      onCronTriggerValueChange,
    }) => ({
      cronCustomization,
      onAddCronTriggerValue,
      onDeleteCronTriggerVaule,
      onCronTriggerValueChange,
    }),
  );

export const useWorkflowPermissions = () =>
  globalStore(
    ({
      permissions,
      writeAll,
      readAll,
      disableAll,
      totalPermissionsEnabled,
      togglePermission,
      toggleDisableAll,
      toggleWriteAll,
      toggleReadAll,
    }) => ({
      permissions,
      writeAll,
      readAll,
      disableAll,
      totalPermissionsEnabled,
      togglePermission,
      toggleDisableAll,
      toggleWriteAll,
      toggleReadAll,
    }),
  );

export const useWorkflowEnv = () =>
  globalStore(({ variables, addVariable, deleteVariable }) => ({
    variables,
    addVariable,
    deleteVariable,
  }));

export const useWorkflowConcurrency = () =>
  globalStore(
    ({
      concurrency,
      toggleConcurrencyCancelInProgress: toggleCancelInProgress,
      onChangeConcurrencyMax: onChangeMax,
      onChangeBasicsName: onChangeName,
      onChangeConcurrencyGroup: onChangeGroup,
      onChangeConcurrencyMatrix: onChangeMatrix,
    }) => ({
      concurrency,
      toggleCancelInProgress,
      onChangeMax,
      onChangeName,
      onChangeGroup,
      onChangeMatrix,
    }),
  );
