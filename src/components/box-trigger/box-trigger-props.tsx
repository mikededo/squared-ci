import { atom, useAtom } from 'jotai';
import React, { useLayoutEffect, useMemo } from 'react';

import { triggerPropsAtom } from '@/atoms';
import { Dot, Draggable, DraggableWrapper, Title } from '@/components';
import {
  CustomTypesCustomizationKeys,
  type Trigger,
  TriggerCustomization,
  TypesCustomizationKeys,
} from '@/domain/trigger';

import { None, Types } from './customizations';

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
  const [selectedTypes, setSelectedTypes] = useAtom(
    useMemo(() => triggerPropsAtom(), [])
  );

  const handleOnTypesToggle =
    (trigger: TypesCustomizationKeys | CustomTypesCustomizationKeys) =>
    (type: string) => {
      setSelectedTypes([trigger, type]);
      onPositionChange?.();
    };

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
        onPositionChange={onPositionChange}
      >
        <DraggableWrapper>
          <Title title={trigger ? `${trigger} props` : 'No trigger selected'} />
          <div className="px-3 pb-3">
            {trigger ? (
              TriggerCustomization[trigger] === 'types' ||
              TriggerCustomization[trigger] === 'custom-types' ? (
                <Types
                  trigger={trigger}
                  selected={[...(selectedTypes[trigger] as Set<string>)]}
                  onTypeToggle={handleOnTypesToggle(
                    trigger as
                      | TypesCustomizationKeys
                      | CustomTypesCustomizationKeys
                  )}
                />
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
        <Dot active={!!trigger} position="left" />
      </Draggable>
    </DraggableWrapper>
  );
};
