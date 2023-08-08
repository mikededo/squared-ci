import React from 'react';

import { Positions } from '@/config';
import type { Trigger } from '@/domain/trigger';
import { Dot, Draggable, DraggableWrapper } from '@/sd';

import { InvisibleGroup } from './invisible-group';
import { VisibleGroup } from './visible-group';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  selected: Set<Trigger>;
  onPositionChange: () => void;
  onTriggerChange: (trigger: Trigger) => void;
};

export const BoxTriggerSelector: React.FC<Props> = ({
  innerRef,
  selected,
  onPositionChange,
  onTriggerChange,
}) => (
  <DraggableWrapper>
    <Draggable
      innerRef={innerRef}
      initialX={Positions.BoxTriggerX}
      initialY={Positions.BoxTriggerY}
      onPositionChange={onPositionChange}
      visible={({ ref, onExpand }) => (
        <VisibleGroup
          expandableRef={ref}
          selected={selected}
          onExpand={onExpand}
          onTriggerChange={onTriggerChange}
        />
      )}
      invisible={({ ref }) => (
        <InvisibleGroup
          expandableRef={ref}
          selected={selected}
          onTriggerChange={onTriggerChange}
        />
      )}
      skipChildrenMemoization
    >
      <Dot active={selected.size > 0} position="left" />
      <Dot active={selected.size > 0} position="right" />
    </Draggable>
  </DraggableWrapper>
);
