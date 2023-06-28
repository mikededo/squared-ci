import React from 'react';

import { Divider, DraggableWrapper } from '@/components';
import { Trigger } from '@/domain/trigger';
import { WithExpandableRef } from '@/hooks';

import { InvisibleTriggers } from './invisible-triggers';

type Props = {
  selected: Trigger | null;
  onTriggerChange: (trigger: Trigger) => void;
};

export const InvisibleGroup: React.FC<
  WithExpandableRef<HTMLDivElement> & Props
> = ({ expandableRef, selected, onTriggerChange }) => (
  <DraggableWrapper>
    <div
      className="relative px-3 pb-4 pt-2 flex gap-2 flex-col"
      ref={expandableRef}
    >
      <DraggableWrapper>
        <Divider />
        <InvisibleTriggers selected={selected} onIconClick={onTriggerChange} />
      </DraggableWrapper>
    </div>
  </DraggableWrapper>
);
