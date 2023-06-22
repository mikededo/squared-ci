import { useAtom } from 'jotai';
import { useMemo } from 'react';

import { draggableAtom } from '@/atoms';

export const useDraggable = () => {
  const [state, setState] = useAtom(useMemo(() => draggableAtom(), []));

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

    setState({ x: e.clientX, y: e.clientY });
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
