import React from 'react';

import { Divider, DraggableWrapper } from '@/aero';
import type { Trigger } from '@/editor/domain/trigger';
import { InvisibleTriggers } from '@/editor/domain/trigger';
import type { WithExpandableRef } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

import { TriggerGroup } from './trigger-group';

type Props = {
  onTriggerChange: (trigger: Trigger) => void;
};

export const InvisibleGroup: React.FC<
  WithExpandableRef<HTMLDivElement> & Props
> = ({ expandableRef, onTriggerChange }) => {
  const { triggers: selected } = useWorkflowTriggersStore();

  return (
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
};
