import React from 'react';

import { Draggable, DraggableWrapper } from '@/components';

import { Name } from './name';
import { RunName } from './run-name';

export const BoxName = () => (
  <DraggableWrapper>
    <Draggable
      visible={({ ref, dragging, onExpand }) => (
        <Name expandableRef={ref} onExpand={onExpand} isDragging={dragging} />
      )}
      invisible={({ ref, dragging }) => (
        <RunName expandableRef={ref} isDragging={dragging} />
      )}
    />
  </DraggableWrapper>
);
