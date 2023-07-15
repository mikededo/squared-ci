import { create } from 'zustand';

import type { GlobalStore } from './types';
import { workflowBasicsStore } from './workflow-basics';
import { workflowTriggersStore } from './workflow-triggers';

const globalStore = create<GlobalStore>()((...args) => ({
  ...workflowBasicsStore(...args),
  ...workflowTriggersStore(...args),
}));

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
