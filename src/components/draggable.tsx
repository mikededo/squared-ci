import classNames from 'classnames';
import React from 'react';

import { useDraggable } from '@/hooks';

export const Draggable = () => {
  const { isDragging, position, onDrag, onDragStart, onDragEnd } =
    useDraggable();

  return (
    <article
      className={classNames(
        'rounded-lg bg-white border-gray-300 border w-60 h-20 flex items-center justify-center relative transition-shadow hover:shadow-md',
        isDragging ? 'shadow-md' : null
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseMove={onDrag}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
    />
  );
};
