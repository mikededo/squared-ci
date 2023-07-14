import React, { useLayoutEffect, useRef } from 'react';

import type { Trigger } from '@/domain/trigger';
import { isCronCustomization } from '@/domain/trigger';
import { isTbdCustomization } from '@/domain/trigger';
import { isNoneCustomization } from '@/domain/trigger';
import { useViewport } from '@/hooks';
import { useHorizontalOrigin, useWorkflowTriggersStore } from '@/stores';

import { BoxTriggerConnector } from './box-trigger-connector';
import { BoxTriggerProps } from './box-trigger-props';
import { BoxTriggerSelector } from './box-trigger-selector';

export const BoxTrigger = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useViewport();
  const { addOrigin, onParentChange } = useHorizontalOrigin();

  const {
    triggers,
    toggleCronTrigger,
    toggleTbdTrigger,
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
    if (isTbdCustomization(trigger)) {
      toggleTbdTrigger(trigger);
      return;
    }
    toggleTypeTrigger(trigger);

    handleOnParentChange();
  };

  const handleOnExpand = (onExpand: () => void) => () => {
    onExpand();
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

  return (
    <>
      <svg
        className="fill-none fixed pointer-events-none"
        width={width}
        height={height}
      >
        {[...triggers].map((trigger) => (
          <BoxTriggerConnector key={trigger} trigger={trigger} />
        ))}
      </svg>
      <BoxTriggerSelector
        innerRef={ref}
        selected={triggers}
        onExpand={handleOnExpand}
        onPositionChange={handleOnParentChange}
        onTriggerChange={handleOnTriggerChange}
      />
      {[...triggers].map((trigger) => (
        <BoxTriggerProps key={trigger} trigger={trigger} />
      ))}
    </>
  );
};
