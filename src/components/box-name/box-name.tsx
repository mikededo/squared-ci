import React from 'react';

import { Draggable, DraggableWrapper } from '@/components';
import { useActiveChildren } from '@/hooks';

import { Name } from './name';
import { RunName } from './run-name';

export const BoxName = () => {
  const { isAnyChildActive, onChange } = useActiveChildren();

  const handleOnInputClick = (child: 'name' | 'run-name') => () => {
    onChange(child);
  };

  return (
    <DraggableWrapper>
      <Draggable
        active={isAnyChildActive}
        visible={({ ref, dragging, onExpand }) => (
          <Name
            expandableRef={ref}
            onExpand={onExpand}
            isDragging={dragging}
            onInputClick={handleOnInputClick('name')}
          />
        )}
        invisible={({ ref, dragging }) => (
          <RunName
            expandableRef={ref}
            isDragging={dragging}
            onInputClick={handleOnInputClick('run-name')}
          />
        )}
      />
    </DraggableWrapper>
  );
};
