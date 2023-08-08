import { useLayoutEffect, useRef } from 'react';

import type { Trigger } from '@/domain/trigger';
import {
  isComplexCustomization,
  isCronCustomization,
  isNoneCustomization,
} from '@/domain/trigger';
import { useHorizontalOrigin, useWorkflowTriggersStore } from '@/stores';

export const useBoxTrigger = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { addOrigin, onParentChange } = useHorizontalOrigin();

  const {
    triggers,
    toggleCronTrigger,
    toggleComplexTrigger,
    toggleTypeTrigger,
    toggleNoneTrigger,
  } = useWorkflowTriggersStore();

  const handleOnParentChange = () => {
    if (!ref.current) {
      return;
    }

    const { x, y, width, height } = ref.current.getBoundingClientRect();
    onParentChange({
      rect: { x, y, width, height },
      screen: { width, height },
    });
  };

  const handleOnTriggerChange = (trigger: Trigger) => {
    if (isNoneCustomization(trigger)) {
      toggleNoneTrigger(trigger);
      return;
    }
    if (isCronCustomization(trigger)) {
      toggleCronTrigger(trigger);
      return;
    }
    if (isComplexCustomization(trigger)) {
      toggleComplexTrigger(trigger);
      return;
    }
    toggleTypeTrigger(trigger);

    handleOnParentChange();
  };

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const { x, y, width } = ref.current.getBoundingClientRect();
    addOrigin({ x, y, width, height: 160 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref,
    triggers,
    onTriggerChange: handleOnTriggerChange,
    onParentChange: handleOnParentChange,
  };
};
