import { globalStore } from './global-store';

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
export const useWorkflowTriggersToggler = () =>
  globalStore(({ hideTriggers, toggleHideTriggers }) => ({
    hideTriggers,
    toggleHideTriggers,
  }));
