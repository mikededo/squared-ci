import React from 'react';

import { DraggableTitle, DraggableWrapper } from '@/aero';
import { ActionsDocs } from '@/editor/config';
import type { Trigger } from '@/editor/domain/trigger';
import { VisibleTriggers } from '@/editor/domain/trigger';
import type { ExpandableToggler, WithExpandableRef } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

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
        <DraggableTitle
          title="Workflow trigger"
          docsHref={ActionsDocs.workflowTriggers}
          onExpand={onExpand}
        />
        <DraggableWrapper>
          <div className="px-3 pb-3 flex flex-col gap-1.5">
            <DraggableWrapper>
              <p className="text-xs italic font-mono text-muted-foreground max-w-[210px]">
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
