import React from 'react';

import { DraggableWrapper, Title } from '@/components';
import type { Trigger } from '@/domain/trigger';
import type { ExpandableToggler, WithExpandableRef } from '@/hooks';

import { VisibleTriggers } from './visible-triggers';

type Props = {
  selected: Set<Trigger>;
  onTriggerChange: (trigger: Trigger) => void;
};

export const VisibleGroup: React.FC<
  WithExpandableRef<HTMLDivElement> & ExpandableToggler & Props
> = ({ selected, expandableRef, onExpand, onTriggerChange }) => (
  <DraggableWrapper>
    <div ref={expandableRef}>
      <DraggableWrapper>
        <Title title="Workflow trigger" onExpand={onExpand} />
        <div className="px-3 pb-3 flex flex-col gap-1.5">
          <DraggableWrapper>
            <p className="text-xs italic font-mono text-gray-400 max-w-[210px]">
              {selected.size > 0 ? [...selected].join(', ') : 'Select dispatch'}
            </p>
            <VisibleTriggers
              selected={selected}
              onIconClick={onTriggerChange}
            />
          </DraggableWrapper>
        </div>
      </DraggableWrapper>
    </div>
  </DraggableWrapper>
);
