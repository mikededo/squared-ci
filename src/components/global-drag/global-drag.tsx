import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/domain/shared';
import { useFeatureSwitch, useGlobalDragNotifier } from '@/stores';

export const GlobalDrag: RequiredChildrenFC = ({ children }) => {
  const { fsGlobalDrag } = useFeatureSwitch('fsGlobalDrag');
  const {
    isDragging,
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
      className={twMerge(
        'h-screen w-screen relative overflow-hidden cursor-grab',
        isDragging && 'cursor-grabbing',
        !fsGlobalDrag && 'cursor-default'
      )}
    >
      {children}
    </div>
  );
};
