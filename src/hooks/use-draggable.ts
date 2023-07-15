import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { draggableAtom } from '@/atoms';

export type Position = { x: number; y: number };
type PositionSideEffects = { onDrag?: (position: Position) => void };

export const useDraggable = ({
  x,
  y,
  onDrag: onDragCallback,
}: Position & PositionSideEffects) => {
  const [state, setState] = useAtom(
    // If x,y are in the dep array, on every sibling update the position
    // will also change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => draggableAtom({ x, y }), [])
  );

  const handleOnDragStart: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!e) {
      return;
    }

    const { left, top } = e.currentTarget.getBoundingClientRect();
    setState({ dragging: true, ox: e.clientX - left, oy: e.clientY - top });
  };

  const handleOnDrag: React.MouseEventHandler<HTMLElement> = (e) => {
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
