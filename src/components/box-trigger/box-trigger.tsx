import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import type { Trigger } from '@/domain/trigger';
import { useSiblingPath } from '@/hooks/use-sibling-position';

import { BoxTriggerProps } from './box-trigger-props';
import { BoxTriggerSelector } from './box-trigger-selector';
import { BoxConnectors } from '..';

export const BoxTrigger = () => {
  const {
    originRef,
    destinationRef,
    arrowPath,
    nextX,
    nextY,
    originDotPosition,
    onUpdatePath,
  } = useSiblingPath<HTMLDivElement>();

  const [activeTriggers, setActiveTriggers] = useAtom(
    useMemo(() => atom<Set<Trigger>>(new Set<Trigger>()), [])
  );
  const paths =
    activeTriggers.size > 0
      ? [...activeTriggers].reduce(
          (prev, key) => [...prev, { key: key, path: arrowPath }],
          [] as { key: string; path: string }[]
        )
      : [];

  const handleOnTriggerChange = (trigger: Trigger) => {
    const updated = new Set([...activeTriggers]);
    if (updated.has(trigger)) {
      updated.delete(trigger);
    } else {
      updated.add(trigger);
    }
    setActiveTriggers(updated);

    onUpdatePath();
  };

  const handleOnExpand = (onExpand: () => void) => () => {
    onExpand();
    onUpdatePath();
  };

  return (
    <>
      <BoxConnectors paths={paths} />
      <BoxTriggerSelector
        innerRef={originRef}
        selected={activeTriggers}
        dotPosition={originDotPosition}
        onExpand={handleOnExpand}
        onPositionChange={onUpdatePath}
        onTriggerChange={handleOnTriggerChange}
      />
      {[...activeTriggers].map((trigger) => (
        <BoxTriggerProps
          key={trigger}
          innerRef={destinationRef}
          trigger={trigger}
          initialX={nextX}
          initialY={nextY}
          onPositionChange={onUpdatePath}
        />
      ))}
    </>
  );
};
