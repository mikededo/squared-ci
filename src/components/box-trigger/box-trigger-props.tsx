import React from 'react';

import { type Trigger } from '@/domain/trigger';
import { Dot, Draggable, DraggableTitle, DraggableWrapper } from '@/sd';

import { TypeRenderer } from './customizations';
import { useBoxTriggerProps } from './use-box-trigger-props';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  trigger: Trigger | null;
};

export const BoxTriggerProps: React.FC<Props> = ({ trigger }) => {
  const { ref, initialX, initialY, dotPosition, onNotifyListeners } =
    useBoxTriggerProps(trigger);

  return (
    <DraggableWrapper>
      <Draggable
        innerRef={ref}
        initialX={initialX}
        initialY={initialY}
        onPositionChange={onNotifyListeners}
      >
        <DraggableWrapper>
          <DraggableTitle
            title={trigger ? `${trigger} props` : 'No trigger selected'}
          />
          <div className="px-3 pb-3">
            <TypeRenderer trigger={trigger} />
          </div>
        </DraggableWrapper>
        {dotPosition ? <Dot active position={dotPosition} /> : null}
      </Draggable>
    </DraggableWrapper>
  );
};
