import { create } from 'zustand';

import type { FeatureSwitches } from '@/domain/feature-switches';

import { featureSwitchesStore } from './feature-switches';
import { globalDragStore } from './global-drag';
import type { Empty, GlobalStore } from './types';
import { workflowBasicsStore } from './workflow-basics';
import { workflowTriggersStore } from './workflow-triggers';

const globalStore = create<GlobalStore>()((...args) => ({
  ...featureSwitchesStore(...args),
  ...globalDragStore(...args),
  ...workflowBasicsStore(...args),
  ...workflowTriggersStore(...args),
}));

export const useFeatureSwitch = <FS extends FeatureSwitches>(
  fs: FS
): { [key in FS]: boolean } & { toggleFS: Empty } =>
  globalStore(
    ({ toggleFS, ...state }) =>
      ({
        [fs]: state[fs],
        toggleFS: () => {
          toggleFS(fs);
        },
      } as never)
  );
export const useActiveFSCount = () =>
  globalStore(({ activeFSCount }) => activeFSCount);

export const useGlobalDragNotifier = () =>
  globalStore(({ isDragging, onDragStart, onDragEnd, onDragChange }) => ({
    isDragging,
    onDragStart,
    onDragEnd,
    onDragChange,
  }));
export const useGlobalDragListener = () =>
  globalStore(({ x, y }) => ({ x, y }));

export const useWorkflowBasicsStore = () =>
  globalStore(({ name, runName, onChangeName, onChangeRunName }) => ({
    name,
    runName,
    onChangeName,
    onChangeRunName,
  }));

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
      toggleCronTrigger,
    })
  );
