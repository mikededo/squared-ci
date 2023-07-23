import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Positions } from '@/config';
import type { InitialPosition } from '@/domain/shared';
import type {
  CustomTypesCustomizationKeys,
  TypesCustomizationKeys,
} from '@/domain/trigger';
import { isTypeCustomization } from '@/domain/trigger';
import { type Trigger } from '@/domain/trigger';
import { useViewport } from '@/hooks';
import type { DotPosition } from '@/sd';
import { Dot, Draggable, DraggableTitle, DraggableWrapper } from '@/sd';
import { useHorizontalDestination, useWorkflowTriggersStore } from '@/stores';

import { None, Types } from './customizations';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  trigger: Trigger | null;
};

type ConnectorPosition = { dotPosition: DotPosition | null } & InitialPosition;

export const BoxTriggerProps: React.FC<Props> = ({ trigger }) => {
  const ref = useRef<HTMLDivElement>(null);
  const screen = useViewport();
  const { addDestination, onDestinationChange } = useHorizontalDestination();
  const { toggleTypeTriggerProp, getTriggerTypes } = useWorkflowTriggersStore();

  const [{ initialX, initialY, dotPosition }, setInitialPosition] =
    useState<ConnectorPosition>({
      initialX: Positions.BoxTriggerPropsX,
      initialY: Positions.BoxTriggerPropsY,
      dotPosition: 'left',
    });

  const handleOnTypesToggle =
    (trigger: TypesCustomizationKeys | CustomTypesCustomizationKeys) =>
    (type: string) => {
      toggleTypeTriggerProp(trigger, type);
    };

  const handleOnNotifyListeners = () => {
    if (!trigger || !ref.current) {
      return;
    }

    const { x, y, width, height } = ref.current.getBoundingClientRect();
    onDestinationChange({
      trigger,
      destination: { x, y, width, height },
      screen,
    });
  };

  useEffect(() => {
    if (!trigger || !ref.current) {
      return;
    }

    const { x, y, width, height } = ref.current.getBoundingClientRect();

    const initialPosition = addDestination({
      trigger,
      screen,
      initialRect: { x, y, width, height },
    });
    if (initialPosition) {
      setInitialPosition(initialPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useLayoutEffect(() => {
    handleOnNotifyListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DraggableWrapper>
      <Draggable
        innerRef={ref}
        initialX={initialX}
        initialY={initialY}
        onPositionChange={handleOnNotifyListeners}
      >
        <DraggableWrapper>
          <DraggableTitle
            title={trigger ? `${trigger} props` : 'No trigger selected'}
          />
          <div className="px-3 pb-3">
            {trigger ? (
              isTypeCustomization(trigger) ? (
                <DraggableWrapper>
                  <Types
                    trigger={trigger}
                    selected={[...getTriggerTypes(trigger)]}
                    onTypeToggle={handleOnTypesToggle(trigger)}
                  />
                </DraggableWrapper>
              ) : (
                <None />
              )
            ) : (
              <DraggableWrapper>
                <p className="text-sm text-center text-gray-400">
                  Select a triggger to display its properties
                </p>
              </DraggableWrapper>
            )}
          </div>
        </DraggableWrapper>
        {dotPosition ? <Dot active position={dotPosition} /> : null}
      </Draggable>
    </DraggableWrapper>
  );
};
