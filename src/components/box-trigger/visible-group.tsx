import React from 'react';

import type { Trigger } from '@/domain/trigger';
import { VisibleTriggers } from '@/domain/trigger';
import type { ExpandableToggler, WithExpandableRef } from '@/hooks';
import { DraggableTitle, DraggableWrapper } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

import { TriggerGroup } from './trigger-group';

type Props = {
  onTriggerChange: (trigger: Trigger) => void;
};

export const VisibleGroup: React.FC<
  WithExpandableRef<HTMLDivElement> & ExpandableToggler & Props
> = ({ expandableRef, onExpand, onTriggerChange }) => {
  const { triggers: selected } = useWorkflowTriggersStore();

  return (
    <DraggableWrapper>
      <div ref={expandableRef}>
        <DraggableTitle title="Workflow trigger" onExpand={onExpand} />
        <DraggableWrapper>
          <div className="px-3 pb-3 flex flex-col gap-1.5">
            <DraggableWrapper>
              <p className="text-xs italic font-mono text-gray-400 dark:text-slate-200 max-w-[210px]">
                {selected.size > 0
                  ? [...selected].join(', ')
                  : 'Select dispatch'}
              </p>
              <TriggerGroup
                triggers={VisibleTriggers}
                selected={selected}
                onIconClick={onTriggerChange}
              />
            </DraggableWrapper>
          </div>
        </DraggableWrapper>
      </div>
    </DraggableWrapper>
  );
};
