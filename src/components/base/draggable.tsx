import classNames from 'classnames';
import React from 'react';

import { useDraggable, useExpandable } from '@/hooks';

import { DraggableWrapper, isEventFromDataDraggable } from '../dd';

type RenderProps<T extends HTMLElement = HTMLElement> = {
  ref: React.RefObject<T>;
  dragging: boolean;
  onExpand: () => void;
};
type RenderFn = ({
  ref,
  onExpand,
}: RenderProps<HTMLDivElement>) => React.ReactElement;
type Props = {
  active?: boolean;
  visible: RenderFn;
  invisible?: RenderFn;
};

export const Draggable = ({ active, visible, invisible }: Props) => {
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
          'rounded-lg bg-white min-w-[240px] max-w-fit flex flex-col absolute transition-[max-height,_shadow,_border] hover:shadow-[0_4px_6px_0_rgb(0_0_0_/_0.05)] group border hover:border-indigo-400',
          isDragging
            ? 'hover:shadow-[0_4px_6px_0_rgb(0_0_0_/_0.05)] border-indigo-400'
            : 'border-slate-200',
          active ? 'border-indigo-200' : 'border-slate-200'
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
