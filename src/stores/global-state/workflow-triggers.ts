import type { StateCreator } from 'zustand';

import type { ComplexTypesCustomizationKeys } from '@/domain/trigger';
import { DefaultCronValue, isComplexCustomization } from '@/domain/trigger';

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
  value: string
) => {
  const branchesCustomization = customization.get(key) ?? new Set<string>();
  const updatedCustomization = addToMap(
    customization,
    key,
    branchesCustomization.has(value)
      ? removeFromSet(branchesCustomization, value)
      : addToSet(branchesCustomization, value)
  );

  return addToMap(complexCustomization, trigger, updatedCustomization);
};

const complexTypeMap = () =>
  new Map([
    ['types', new Set<string>()],
    ['tags', new Set<string>()],
    ['paths', new Set<string>()],
    ['branches', new Set<string>()],
  ] as const);

export const workflowTriggersStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowTriggersStore
> = (set, get) => ({
  noneCustomization: new Set(),
  typeCustomization: new Map(),
  complexCustomization: new Map(),
  cronCustomization: new Map(),
  triggers: new Set(),
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
          prop
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
            : addToSet(customization, prop)
        ),
      });
    }
  },
  toggleComplexTriggerBranch: (trigger, branch) => {
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
        'branches',
        branch
      ),
    });
  },
  getComplexTriggerBranches: (trigger) => {
    const { complexCustomization } = get();
    const customization = complexCustomization.get(trigger);
    return customization?.get('branches') ?? new Set();
  },
  toggleComplexTriggerPath: (trigger, path) => {
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
        'paths',
        path
      ),
    });
  },
  toggleComplexTriggerTag: (trigger, tags) => {
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
        'tags',
        tags
      ),
    });
  },
  toggleCronTrigger: (trigger) => {
    const { triggers, cronCustomization } = get();
    const exists = triggers.has(trigger);
    set({
      triggers: exists
        ? removeFromSet(triggers, trigger)
        : addToSet(triggers, trigger),
      cronCustomization: exists
        ? removeFromMap(cronCustomization, trigger)
        : addToMap(cronCustomization, trigger, DefaultCronValue),
    });
  },
});
