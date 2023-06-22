import classNames from 'classnames';
import React from 'react';

import { DraggableWrapper, Title } from '@/components';
import { ExpandableToggler, WithExpandableRef } from '@/hooks';

export const Name: React.FC<
  WithExpandableRef<HTMLDivElement> &
    ExpandableToggler & { isDragging: boolean }
> = ({ expandableRef, isDragging, onExpand }) => (
  <DraggableWrapper>
    <div ref={expandableRef} className={classNames('transition-shadow')}>
      <Title title="Workflow basics" onExpand={onExpand} />
      <DraggableWrapper>
        <div className="px-3 pb-3 pt-1.5">
          <input
            placeholder="Job name"
            className="font-mono text-sm px-2 py-1.5 rounded-md w-full border border-gray-200"
            disabled={isDragging}
          />
        </div>
      </DraggableWrapper>
    </div>
  </DraggableWrapper>
);
