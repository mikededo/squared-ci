import React, { useLayoutEffect } from 'react';

import { Dot, Draggable, DraggableWrapper, Title } from '@/components';
import { useActiveChildren } from '@/hooks';

import { None } from './customizations';
import { Trigger } from './types';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  trigger: Trigger | null;
  initialX: number;
  initialY: number;
  onPositionChange?: () => void;
};

export const BoxTriggerProps: React.FC<Props> = ({
  innerRef,
  initialX,
  initialY,
  trigger,
  onPositionChange,
}) => {
  const { isAnyChildActive } = useActiveChildren();

  useLayoutEffect(() => {
    onPositionChange?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={initialX}
        initialY={initialY}
        active={isAnyChildActive}
        onPositionChange={onPositionChange}
      >
        <DraggableWrapper>
          <Title title={trigger ? `${trigger} props` : 'No trigger selected'} />
          <div className="px-3 pb-3">
            {trigger ? (
              <None />
            ) : (
              <DraggableWrapper>
                <p className="text-sm text-center text-gray-400">
                  Select a triggger to display its properties
                </p>
              </DraggableWrapper>
            )}
          </div>
        </DraggableWrapper>
        <Dot active={!!trigger} position="left" />
      </Draggable>
    </DraggableWrapper>
  );
};
