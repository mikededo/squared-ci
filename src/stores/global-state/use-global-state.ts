import { create } from 'zustand';

import { featureSwitchesStore } from './feature-switches';
import { globalDragStore } from './global-drag';
import type { FeatureSwitchesState, GlobalStore } from './types';
import { workflowBasicsStore } from './workflow-basics';
import { workflowTriggersStore } from './workflow-triggers';

const globalStore = create<GlobalStore>()((...args) => ({
  ...featureSwitchesStore(...args),
  ...globalDragStore(...args),
  ...workflowBasicsStore(...args),
  ...workflowTriggersStore(...args),
}));

export const useFeatureSwitch = (fs: keyof FeatureSwitchesState) =>
  globalStore(({ toggleFS, ...state }) => ({ [fs]: state[fs], toggleFS }));

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
      toggleCronTrigger,
    })
  );
