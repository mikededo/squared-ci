import React from 'react';

import type { ExpandableToggler, WithExpandableRef } from '@/hooks';
import { DraggableTitle, DraggableWrapper, Input } from '@/sd';
import { useWorkflowBasicsStore } from '@/stores';

type Props = { isDragging: boolean; onInputClick?: () => void };

export const Name: React.FC<
  WithExpandableRef<HTMLDivElement> & ExpandableToggler & Props
> = ({ expandableRef, isDragging, onExpand, onInputClick }) => {
  const { name, onChangeName } = useWorkflowBasicsStore();

  const handleOnChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    onChangeName(e.currentTarget.value);
  };

  return (
    <DraggableWrapper>
      <div ref={expandableRef} className="transition-shadow">
        <DraggableTitle title="Workflow basics" onExpand={onExpand} />
        <DraggableWrapper>
          <div className="px-3 pb-3 pt-1.5">
            <Input
              placeholder="Job name"
              value={name}
              disabled={isDragging}
              onChange={handleOnChangeName}
              onFocus={onInputClick}
              onBlur={onInputClick}
            />
          </div>
        </DraggableWrapper>
      </div>
    </DraggableWrapper>
  );
};
