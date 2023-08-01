import React from 'react';

import type { WithExpandableRef } from '@/hooks';
import { Divider, DraggableWrapper, Input } from '@/sd';
import { useWorkflowBasicsStore } from '@/stores';

type Props = { isDragging: boolean; onInputClick?: () => void };

export const RunName: React.FC<WithExpandableRef<HTMLDivElement> & Props> = ({
  expandableRef,
  isDragging,
  onInputClick,
}) => {
  const { runName, onChangeRunName } = useWorkflowBasicsStore();

  const handleOnChangeRunName = (e: React.FormEvent<HTMLInputElement>) => {
    onChangeRunName(e.currentTarget.value);
  };

  return (
    <DraggableWrapper>
      <div
        ref={expandableRef}
        className="relative px-3 pb-4 pt-1.5 flex gap-2 flex-col"
      >
        <DraggableWrapper>
          <Divider />
          <p className="text-xs text-gray-400 dark:text-slate-200 uppercase">
            Additional properties
          </p>
        </DraggableWrapper>
        <Input
          placeholder="Job run-name"
          value={runName}
          disabled={isDragging}
          onChange={handleOnChangeRunName}
          onFocus={onInputClick}
          onBlur={onInputClick}
        />
      </div>
    </DraggableWrapper>
  );
};
