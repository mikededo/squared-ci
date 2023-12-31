import type { StateCreator } from 'zustand';

import { LS } from '@/editor/domain/local-storage';
import type {
  ComplexTypesCustomizationKeys,
  Cron,
} from '@/editor/domain/trigger';
import {
  DefaultCronValue,
  isComplexCustomization,
} from '@/editor/domain/trigger';

import type {
  ComplexTypeCustomizationProps,
  GlobalStore,
  WorkflowTriggersStore,
} from './types';

const addToSet = <T>(elements: Set<T>, element: T): Set<T> => {
  const clone = new Set([...elements]);
  clone.add(element);
  return clone;
};

const removeFromSet = <T>(elements: Set<T>, element: T): Set<T> => {
  const clone = new Set([...elements]);
  clone.delete(element);
  return clone;
};

const addToMap = <K, V>(elements: Map<K, V>, key: K, value: V) => {
  const clone = new Map([...elements]);
  clone.set(key, value);
  return clone;
};

const removeFromMap = <K, V>(elements: Map<K, V>, key: K) => {
  const clone = new Map([...elements]);
  clone.delete(key);
  return clone;
};

const addToComplexCustomization = (
  complexCustomization: WorkflowTriggersStore['complexCustomization'],
  customization: Map<ComplexTypeCustomizationProps, Set<string>>,
  trigger: ComplexTypesCustomizationKeys,
  key: ComplexTypeCustomizationProps,
  value: string,
) => {
  const branchesCustomization = customization.get(key) ?? new Set<string>();
  const updatedCustomization = addToMap(
    customization,
    key,
    branchesCustomization.has(value)
      ? removeFromSet(branchesCustomization, value)
      : addToSet(branchesCustomization, value),
  );

  return addToMap(complexCustomization, trigger, updatedCustomization);
};

const complexTypeMap = () =>
  new Map([
    ['types', new Set<string>()],
    ['tags', new Set<string>()],
    ['tags-ignore', new Set<string>()],
    ['paths', new Set<string>()],
    ['paths-ignore', new Set<string>()],
    ['branches', new Set<string>()],
    ['branches-ignore', new Set<string>()],
  ] as const);

export const workflowTriggersStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowTriggersStore
> = (set, get) => ({
  hideTriggers: LS.get('hideTriggers') ?? false,
  noneCustomization: new Set(),
  typeCustomization: new Map(),
  complexCustomization: new Map(),
  cronCustomization: new Map(),
  triggers: new Set(),
  toggleHideTriggers: () => {
    set({ hideTriggers: !get().hideTriggers });
  },
  toggleNoneTrigger: (trigger) => {
    const { triggers, noneCustomization } = get();
    const exists = triggers.has(trigger);
    set({
      triggers: exists
        ? removeFromSet(triggers, trigger)
        : addToSet(triggers, trigger),
      noneCustomization: exists
        ? removeFromSet(noneCustomization, trigger)
        : addToSet(noneCustomization, trigger),
    });
  },
  toggleComplexTrigger: (trigger) => {
    const { triggers, complexCustomization } = get();
    const exists = triggers.has(trigger);
    set({
      triggers: exists
        ? removeFromSet(triggers, trigger)
        : addToSet(triggers, trigger),
      complexCustomization: exists
        ? removeFromMap(complexCustomization, trigger)
        : addToMap(complexCustomization, trigger, complexTypeMap()),
    });
  },
  toggleTypeTrigger: (trigger) => {
    const { triggers, typeCustomization } = get();
    const exists = triggers.has(trigger);
    set({
      triggers: exists
        ? removeFromSet(triggers, trigger)
        : addToSet(triggers, trigger),
      typeCustomization: exists
        ? removeFromMap(typeCustomization, trigger)
        : addToMap(typeCustomization, trigger, new Set()),
    });
  },
  getTriggerTypes: (trigger) => {
    const { typeCustomization, complexCustomization } = get();
    if (isComplexCustomization(trigger)) {
      return complexCustomization.get(trigger)?.get('types') ?? new Set();
    } else {
      return typeCustomization.get(trigger) ?? new Set();
    }
  },
  toggleTypeTriggerProp: (trigger, prop) => {
    const { typeCustomization, complexCustomization } = get();
    if (isComplexCustomization(trigger)) {
      const customization = complexCustomization.get(trigger);
      if (!customization) {
        return;
      }

      set({
        complexCustomization: addToComplexCustomization(
          complexCustomization,
          customization,
          trigger,
          'types',
          prop,
        ),
      });
    } else {
      const customization = typeCustomization.get(trigger);
      if (!customization) {
        return;
      }

      set({
        typeCustomization: addToMap(
          typeCustomization,
          trigger,
          customization.has(prop)
            ? removeFromSet(customization, prop)
            : addToSet(customization, prop),
        ),
      });
    }
  },
  toggleComplexTriggerBranch: (trigger, branch, ignore) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    if (!customization) {
      return;
    }

    set({
      complexCustomization: addToComplexCustomization(
        complexCustomization,
        customization,
        trigger,
        ignore ? 'branches-ignore' : 'branches',
        branch,
      ),
    });
  },
  getComplexTriggerBranches: (trigger, ignore) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    return (
      customization?.get(ignore ? 'branches-ignore' : 'branches') ?? new Set()
    );
  },
  toggleComplexTriggerPath: (trigger, path, ignore) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    if (!customization) {
      return;
    }

    set({
      complexCustomization: addToComplexCustomization(
        complexCustomization,
        customization,
        trigger,
        ignore ? 'paths-ignore' : 'paths',
        path,
      ),
    });
  },
  getComplexTriggerPaths: (trigger, ignore) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    return customization?.get(ignore ? 'paths-ignore' : 'paths') ?? new Set();
  },
  toggleComplexTriggerTag: (trigger, tags, ignore) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    if (!customization) {
      return;
    }

    set({
      complexCustomization: addToComplexCustomization(
        complexCustomization,
        customization,
        trigger,
        ignore ? 'tags-ignore' : 'tags',
        tags,
      ),
    });
  },
  getComplexTriggerTags: (trigger, ignore) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    return customization?.get(ignore ? 'tags-ignore' : 'tags') ?? new Set();
  },
  // This could seem a bit redundant as the only cron trigger is the schedule
  // However, by keeping this implementation, it would be automatically
  // scaled if another trigger was to be added that involved cron usage.
  toggleCronTrigger: (trigger) => {
    const { triggers, cronCustomization } = get();
    const exists = triggers.has(trigger);
    set({
      triggers: exists
        ? removeFromSet(triggers, trigger)
        : addToSet(triggers, trigger),
      cronCustomization: exists
        ? removeFromMap(cronCustomization, trigger)
        : addToMap(cronCustomization, trigger, [DefaultCronValue]),
    });
  },
  onAddCronTriggerValue: (trigger) => {
    const { triggers, cronCustomization } = get();
    const exists = triggers.has(trigger);
    if (!exists) {
      return;
    }

    const currentList = cronCustomization.get(trigger);
    if (!currentList) {
      return;
    }

    set({
      cronCustomization: addToMap(cronCustomization, trigger, [
        ...currentList,
        DefaultCronValue,
      ]),
    });
  },
  onDeleteCronTriggerVaule: (trigger, position) => {
    const { triggers, cronCustomization } = get();
    const exists = triggers.has(trigger);
    if (!exists) {
      return;
    }

    const currentList = cronCustomization.get(trigger);
    if (!currentList) {
      return;
    }

    const updatedList = [...currentList];
    updatedList.splice(position, 1);
    set({
      cronCustomization: addToMap(cronCustomization, trigger, updatedList),
    });
  },

  onCronTriggerValueChange: (trigger, cron, position) => {
    const { cronCustomization } = get();
    const currentList = cronCustomization.get(trigger);
    if (!currentList) {
      return;
    }
    if (!currentList[position]) {
      return;
    }

    const nextCron: Cron = [
      cron[0] ?? currentList[position][0],
      cron[1] ?? currentList[position][1],
      cron[2] ?? currentList[position][2],
      cron[3] ?? currentList[position][3],
      cron[4] ?? currentList[position][4],
    ];
    const updatedCronList = [...currentList];
    updatedCronList[position] = nextCron;

    set({
      cronCustomization: addToMap(cronCustomization, trigger, updatedCronList),
    });
  },
});
