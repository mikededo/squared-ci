import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { DotPosition } from '@/components';
import { Dot, Draggable, DraggableWrapper, Title } from '@/components';
import type {
  CustomTypesCustomizationKeys,
  TypesCustomizationKeys,
} from '@/domain/trigger';
import { isTypeCustomization } from '@/domain/trigger';
import { type Trigger } from '@/domain/trigger';
import { useViewport } from '@/hooks';
import { useHorizontalDestination, useWorkflowTriggersStore } from '@/stores';

import { None, Types } from './customizations';

type Props = {
  innerRef?: React.RefObject<HTMLDivElement>;
  trigger: Trigger | null;
};

type ConnectorPosition = {
  initialX: number;
  initialY: number;
  dotPosition: DotPosition | null;
};

export const BoxTriggerProps: React.FC<Props> = ({ trigger }) => {
  const ref = useRef<HTMLDivElement>(null);
  const screen = useViewport();
  const { addDestination, onDestinationChange } = useHorizontalDestination();
  const { toggleTypeTriggerProp, getTriggerTypes } = useWorkflowTriggersStore();

  const [{ initialX, initialY, dotPosition }, setInitialPosition] =
    useState<ConnectorPosition>({
      initialX: 0,
      initialY: 0,
      dotPosition: null,
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
          <Title title={trigger ? `${trigger} props` : 'No trigger selected'} />
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
