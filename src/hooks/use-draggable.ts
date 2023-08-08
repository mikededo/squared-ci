import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { draggableAtom } from '@/atoms';
import type { Position } from '@/domain/shared';

type PositionSideEffects = { onDrag?: (position: Position) => void };
type UseDraggableArgs = Position &
  PositionSideEffects & { absoluteValue?: boolean };

export const useDraggable = ({
  x,
  y,
  onDrag: onDragCallback,
  absoluteValue,
}: UseDraggableArgs) => {
  const [state, setState] = useAtom(
    // If x,y are in the dep array, on every sibling update the position
    // will also change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => draggableAtom({ x, y, absoluteValue }), [])
  );

  const handleOnDragStart: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!e) {
      return;
    }

    const { left, top } = e.currentTarget.getBoundingClientRect();
    setState({ dragging: true, ox: e.clientX - left, oy: e.clientY - top });
  };

  const handleOnDrag = (
    e: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!e || !state.dragging) {
      return;
    }

    const position = { x: e.clientX, y: e.clientY };
    setState(position);
    onDragCallback?.(position);
  };

  const handleOnDragEnd = () => {
    setState({ dragging: false });
  };

  return {
    isDragging: state.dragging,
    position: { x: state.x, y: state.y },
    onDragStart: handleOnDragStart,
    onDrag: handleOnDrag,
    onDragEnd: handleOnDragEnd,
  };
};
