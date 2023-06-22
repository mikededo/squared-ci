import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { Divider, Draggable, DraggableWrapper, Title } from '@/components';
import { useActiveChildren } from '@/hooks';

import { InvisibleTriggers } from './invisible-triggers';
import type { Trigger } from './types';
import { VisibleTriggers } from './visible-triggers';

export const BoxTrigger = () => {
  const { isAnyChildActive } = useActiveChildren();
  const [activeTrigger, setActiveTrigger] = useAtom(
    useMemo(() => atom<Trigger | null>(null), [])
  );

  const onTriggerChange = (trigger: Trigger) => {
    setActiveTrigger(trigger === activeTrigger ? null : trigger);
  };

  return (
    <DraggableWrapper>
      <Draggable
        active={isAnyChildActive}
        visible={({ ref, onExpand }) => (
          <DraggableWrapper>
            <div ref={ref}>
              <Title title="Workflow trigger" onExpand={onExpand} />
              <div className="px-3 pb-3 flex flex-col gap-1.5">
                <p className="text-xs italic font-mono text-gray-400">
                  {activeTrigger ?? 'Select dispatch'}
                </p>
                <VisibleTriggers
                  selected={activeTrigger}
                  onIconClick={onTriggerChange}
                />
              </div>
            </div>
          </DraggableWrapper>
        )}
        invisible={({ ref }) => (
          <DraggableWrapper>
            <div
              className="relative px-3 pb-4 pt-2 flex gap-2 flex-col"
              ref={ref}
            >
              <Divider />
              <InvisibleTriggers
                selected={activeTrigger}
                onIconClick={onTriggerChange}
              />
            </div>
          </DraggableWrapper>
        )}
      />
    </DraggableWrapper>
  );
};
