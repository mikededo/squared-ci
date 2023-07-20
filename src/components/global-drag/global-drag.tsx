import classNames from 'classnames';
import React from 'react';

import type { RequiredChildrenFC } from '@/domain/shared';
import { useGlobalDragNotifier } from '@/stores';

export const GlobalDrag: RequiredChildrenFC = ({ children }) => {
  const {
    onDragStart: start,
    onDragChange: move,
    onDragEnd: end,
  } = useGlobalDragNotifier();

  const handleOnDragStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof Element && e.target.id === 'frame') {
      start(e);
    }
  };

  return (
    <div
      id="frame"
      onMouseMove={move}
      onMouseDown={handleOnDragStart}
      onMouseUp={end}
      className={classNames(
        'h-screen w-screen relative overflow-hidden',
        // TODO: Currently disabled
        // isDragging ? 'cursor-grabbing' : 'cursor-grab'
        'cursor-default'
      )}
    >
      {children}
    </div>
  );
};
