import classNames from 'classnames';
import React from 'react';

import { DraggableWrapper, Input, Title } from '@/components';
import { ExpandableToggler, WithExpandableRef } from '@/hooks';

type Props = { isDragging: boolean; onInputClick?: () => void };

export const Name: React.FC<
  WithExpandableRef<HTMLDivElement> & ExpandableToggler & Props
> = ({ expandableRef, isDragging, onExpand, onInputClick }) => (
  <DraggableWrapper>
    <div ref={expandableRef} className={classNames('transition-shadow')}>
      <Title title="Workflow basics" onExpand={onExpand} />
      <DraggableWrapper>
        <div className="px-3 pb-2 pt-1.5">
          <Input
            placeholder="Job name"
            disabled={isDragging}
            onFocus={onInputClick}
            onBlur={onInputClick}
          />
        </div>
      </DraggableWrapper>
    </div>
  </DraggableWrapper>
);
