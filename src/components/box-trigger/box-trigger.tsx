import { atom, useAtom } from 'jotai';
import React, { useLayoutEffect, useMemo, useRef } from 'react';

import type { Trigger } from '@/domain/trigger';
import { useViewport } from '@/hooks';
import { useHorizontalOrigin } from '@/stores';

import { BoxTriggerConnector } from './box-trigger-connector';
import { BoxTriggerProps } from './box-trigger-props';
import { BoxTriggerSelector } from './box-trigger-selector';

export const BoxTrigger = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useViewport();
  const { addOrigin, onParentChange } = useHorizontalOrigin();

  const [activeTriggers, setActiveTriggers] = useAtom(
    useMemo(() => atom<Set<Trigger>>(new Set<Trigger>()), [])
  );

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
    const updated = new Set([...activeTriggers]);
    if (updated.has(trigger)) {
      updated.delete(trigger);
    } else {
      updated.add(trigger);
    }
    setActiveTriggers(updated);
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
        {[...activeTriggers].map((trigger) => (
          <BoxTriggerConnector key={trigger} trigger={trigger} />
        ))}
      </svg>
      <BoxTriggerSelector
        innerRef={ref}
        selected={activeTriggers}
        onExpand={handleOnExpand}
        onPositionChange={handleOnParentChange}
        onTriggerChange={handleOnTriggerChange}
      />
      {[...activeTriggers].map((trigger) => (
        <BoxTriggerProps key={trigger} trigger={trigger} />
      ))}
    </>
  );
};
