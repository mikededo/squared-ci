import React from 'react';

import { Draggable, DraggableWrapper } from '@/aero';
import { Positions } from '@/editor/config';

import { Name } from './name';
import { RunName } from './run-name';

export const BoxName = () => (
  <DraggableWrapper>
    <Draggable
      initialX={Positions.BoxNameX}
      initialY={Positions.BoxNameY}
      visible={({ ref, dragging, onExpand }) => (
        <Name expandableRef={ref} onExpand={onExpand} isDragging={dragging} />
      )}
      invisible={({ ref, dragging }) => (
        <RunName expandableRef={ref} isDragging={dragging} />
      )}
    />
  </DraggableWrapper>
);
