import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { useViewport } from '@/hooks';
import { useSiblingPath } from '@/hooks/use-sibling-position';

import { BoxTriggerProps } from './box-trigger-props';
import { BoxTriggerSelector } from './box-trigger-selector';
import type { Trigger } from './types';

export const BoxTrigger = () => {
  const { width, height } = useViewport();
  const {
    originRef,
    destinationRef,
    arrowPath,
    nextX,
    nextY,
    originDotPosition,
    onUpdatePath,
  } = useSiblingPath<HTMLDivElement>();

  const [activeTrigger, setActiveTrigger] = useAtom(
    useMemo(() => atom<Trigger | null>(null), [])
  );

  const handleOnTriggerChange = (trigger: Trigger) => {
    onUpdatePath();
    setActiveTrigger(trigger === activeTrigger ? null : trigger);
  };

  const handleOnExpand = (onExpand: () => void) => () => {
    onUpdatePath();
    onExpand();
  };

  return (
    <>
      {activeTrigger ? (
        <svg
          className="fill-none fixed pointer-events-none"
          width={width}
          height={height}
        >
          <path
            className="z-index-10 stroke-[4px] transition-[stroke] stroke-indigo-500"
            d={arrowPath}
          />
        </svg>
      ) : null}
      <BoxTriggerSelector
        innerRef={originRef}
        selected={activeTrigger}
        dotPosition={originDotPosition}
        onExpand={handleOnExpand}
        onPositionChange={onUpdatePath}
        onTriggerChange={handleOnTriggerChange}
      />
      {activeTrigger ? (
        <BoxTriggerProps
          innerRef={destinationRef}
          trigger={activeTrigger}
          initialX={nextX}
          initialY={nextY}
          onPositionChange={onUpdatePath}
        />
      ) : null}
    </>
  );
};
