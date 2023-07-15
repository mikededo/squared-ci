import type { StateCreator } from 'zustand';

import { DefaultCronValue } from '@/domain/trigger';

import type { GlobalStore, WorkflowTriggersStore } from './types';

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
        : addToMap(complexCustomization, trigger, new Map()),
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
    const { typeCustomization } = get();
    const customization = typeCustomization.get(trigger);

    return customization ?? new Set();
  },
  toggleTypeTriggerProp: (trigger, prop) => {
    const { typeCustomization } = get();
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
