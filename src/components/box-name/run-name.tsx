import React from 'react';

import { DraggableWrapper } from '@/components';
import { WithExpandableRef } from '@/hooks';

export const RunName: React.FC<
  WithExpandableRef<HTMLDivElement> & { isDragging: boolean }
> = ({ expandableRef, isDragging }) => (
  <DraggableWrapper>
    <div
      ref={expandableRef}
      className="relative px-3 pb-3 pt-1.5 flex gap-2 flex-col"
    >
      <DraggableWrapper>
        <hr className="w-100 mb-2 border-dashed border-slate-200" />
        <p className="text-xs text-gray-400 uppercase">Additional properties</p>
      </DraggableWrapper>
      <input
        placeholder="Job run-name"
        className="font-mono text-sm px-2 py-1.5 rounded-md w-full border border-gray-200"
        disabled={isDragging}
      />
    </div>
  </DraggableWrapper>
);
