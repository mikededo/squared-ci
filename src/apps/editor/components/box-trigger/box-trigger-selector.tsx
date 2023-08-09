import React from 'react';

import { Draggable, DraggableWrapper } from '@/aero';
import { Positions } from '@/editor/config';
import type { Trigger } from '@/editor/domain/trigger';

import { BoxConnectorDots } from './box-connector-dots';
import { InvisibleGroup } from './invisible-group';
import { VisibleGroup } from './visible-group';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  onPositionChange: () => void;
  onTriggerChange: (trigger: Trigger) => void;
};

export const BoxTriggerSelector: React.FC<Props> = ({
  innerRef,
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
          onExpand={onExpand}
          onTriggerChange={onTriggerChange}
        />
      )}
      invisible={({ ref }) => (
        <InvisibleGroup expandableRef={ref} onTriggerChange={onTriggerChange} />
      )}
    >
      <BoxConnectorDots />
    </Draggable>
  </DraggableWrapper>
);
