import classNames from 'classnames';
import React from 'react';

import { useDraggable, useExpandable } from '@/hooks';

import { DraggableWrapper, isEventFromDataDraggable } from '../dd';

type RenderProps<T extends HTMLElement = HTMLElement> = {
  ref: React.RefObject<T>;
  dragging: boolean;
  onExpand: () => void;
};
type Props = {
  visible: ({
    ref,
    onExpand,
  }: RenderProps<HTMLDivElement>) => React.ReactElement;
  invisible?: ({
    ref,
    onExpand,
  }: RenderProps<HTMLDivElement>) => React.ReactElement;
};

export const Draggable = ({ visible, invisible }: Props) => {
  const { visibleRef, invisibleRef, height, onExpandToggle } = useExpandable<
    HTMLDivElement,
    HTMLDivElement
  >();
  const { isDragging, position, onDrag, onDragStart, onDragEnd } =
    useDraggable();

  const handleOnDragStart = (e: React.MouseEvent<HTMLElement>) => {
    if (isEventFromDataDraggable(e)) {
      onDragStart(e);
    }
  };

  const styles: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    cursor: isDragging ? 'grabbing' : 'grab',
    maxHeight: height,
    overflow: 'hidden',
  };

  return (
    <DraggableWrapper>
      <article
        className={classNames(
          'rounded-lg bg-white border-[#f8f8f8]  min-w-[240px] max-w-fit flex flex-col relative transition-[max-height,_shadow,_border] hover:shadow-[0_4px_6px_0_rgb(0_0_0_/_0.05)] group border-2 border-transparent hover:border-indigo-400',
          isDragging
            ? 'hover:shadow-[0_4px_6px_0_rgb(0_0_0_/_0.05)] border-indigo-400'
            : null
        )}
        style={styles}
        onMouseMove={onDrag}
        onMouseDown={handleOnDragStart}
        onMouseUp={onDragEnd}
        data-draggable={true}
      >
        {visible({
          ref: visibleRef,
          dragging: isDragging,
          onExpand: onExpandToggle,
        })}
        {invisible
          ? invisible({
              ref: invisibleRef,
              dragging: isDragging,
              onExpand: onExpandToggle,
            })
          : null}
      </article>
    </DraggableWrapper>
  );
};
