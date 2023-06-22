import React from 'react';

import { DraggableWrapper, Input } from '@/components';
import { WithExpandableRef } from '@/hooks';

type Props = { isDragging: boolean; onInputClick?: () => void };

export const RunName: React.FC<WithExpandableRef<HTMLDivElement> & Props> = ({
  expandableRef,
  isDragging,
  onInputClick,
}) => (
  <DraggableWrapper>
    <div
      ref={expandableRef}
      className="relative px-3 pb-4 pt-1.5 flex gap-2 flex-col"
    >
      <DraggableWrapper>
        <hr className="w-100 mb-1 border-dashed border-slate-200" />
        <p className="text-xs text-gray-400 uppercase">Additional properties</p>
      </DraggableWrapper>
      <Input
        placeholder="Job run-name"
        disabled={isDragging}
        onFocus={onInputClick}
        onBlur={onInputClick}
      />
    </div>
  </DraggableWrapper>
);
