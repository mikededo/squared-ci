import classNames from 'classnames';
import React from 'react';

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

  const cursor = !fsGlobalDrag
    ? 'cursor-default'
    : isDragging
    ? 'cursor-grabbing'
    : 'cursor-grab';

  return (
    <div
      id="frame"
      onMouseMove={move}
      onMouseDown={handleOnDragStart}
      onMouseUp={end}
      className={classNames(
        'h-screen w-screen relative overflow-hidden',
        cursor
      )}
    >
      {children}
    </div>
  );
};
