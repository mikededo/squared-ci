import React from 'react';

import type { Trigger } from '@/domain/trigger';
import { InvisibleTriggers } from '@/domain/trigger';
import type { WithExpandableRef } from '@/hooks';
import { Divider, DraggableWrapper } from '@/sd';

import { TriggerGroup } from './trigger-group';

type Props = {
  selected: Set<Trigger>;
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
        <TriggerGroup
          triggers={InvisibleTriggers}
          selected={selected}
          onIconClick={onTriggerChange}
        />
      </DraggableWrapper>
    </div>
  </DraggableWrapper>
);
