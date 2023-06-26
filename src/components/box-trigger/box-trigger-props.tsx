import { atom, useAtom } from 'jotai';
import React, { useLayoutEffect, useMemo } from 'react';

import { Dot, Draggable, DraggableWrapper, Title } from '@/components';

import { None, Types } from './customizations';
import { Trigger, TriggerCustomization } from './types';

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
    useMemo(() => atom<Set<string>>(new Set<string>()), [])
  );

  const handleOnTypeToggle = (type: string) => {
    setSelectedTypes(() => {
      const updated = new Set([...selectedTypes]);
      if (updated.has(type)) {
        updated.delete(type);
      } else {
        updated.add(type);
      }
      return updated;
    });
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
              TriggerCustomization[trigger] === 'types' ? (
                <Types
                  trigger={trigger}
                  selected={[...selectedTypes]}
                  onTypeToggle={handleOnTypeToggle}
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
