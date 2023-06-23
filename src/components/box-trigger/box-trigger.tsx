import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import React, { useCallback, useMemo } from 'react';

import { Dot, Draggable, DraggableWrapper } from '@/components';
import { useViewport } from '@/hooks';
import { useSiblingPath } from '@/hooks/use-sibling-position';

import { BoxTriggerProps } from './box-trigger-props';
import { InvisibleGroup } from './invisible-group';
import type { Trigger } from './types';
import { VisibleGroup } from './visible-group';

export const BoxTrigger = () => {
  const { width, height } = useViewport();
  const {
    originRef,
    destinationRef,
    arrowPath,
    nextX,
    nextY,
    originDotPosition,
    onPositionChange,
  } = useSiblingPath<HTMLDivElement>();

  const [activeTrigger, setActiveTrigger] = useAtom(
    useMemo(() => atom<Trigger | null>(null), [])
  );

  const onTriggerChange = (trigger: Trigger) => {
    onPositionChange();
    setActiveTrigger(trigger === activeTrigger ? null : trigger);
  };

  const handleOnExpand = (onExpand: () => void) => () => {
    onPositionChange();
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
      <DraggableWrapper>
        <Draggable
          innerRef={originRef}
          onPositionChange={onPositionChange}
          visible={({ ref, onExpand }) => (
            <VisibleGroup
              expandableRef={ref}
              selected={activeTrigger}
              onExpand={handleOnExpand(onExpand)}
              onTriggerChange={onTriggerChange}
            />
          )}
          invisible={({ ref }) => (
            <InvisibleGroup
              expandableRef={ref}
              selected={activeTrigger}
              onTriggerChange={onTriggerChange}
            />
          )}
        >
          <Dot active={!!activeTrigger} position={originDotPosition} />
        </Draggable>
      </DraggableWrapper>
      {activeTrigger ? (
        <BoxTriggerProps
          innerRef={destinationRef}
          trigger={activeTrigger}
          initialX={nextX}
          initialY={nextY}
          onPositionChange={onPositionChange}
        />
      ) : null}
    </>
  );
};
