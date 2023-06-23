import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

import { Position, useDraggable, useExpandable } from '@/hooks';

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
  initialX?: number;
  initialY?: number;
  active?: boolean;
  visible?: RenderFn;
  invisible?: RenderFn;
  innerRef?: React.LegacyRef<HTMLElement>;
  onPositionChange?: (position: Position) => void;
};

export const Draggable: React.FC<PropsWithChildren<Props>> = ({
  active,
  initialX,
  initialY,
  innerRef,
  visible,
  invisible,
  children,
  onPositionChange,
}) => {
  const { visibleRef, invisibleRef, height, onExpandToggle } = useExpandable<
    HTMLDivElement,
    HTMLDivElement
  >();
  const { isDragging, position, onDrag, onDragStart, onDragEnd } = useDraggable(
    { x: initialX, y: initialY, onDrag: onPositionChange }
  );

  const handleOnDragStart = (e: React.MouseEvent<HTMLElement>) => {
    if (isEventFromDataDraggable(e)) {
      onDragStart(e);
    }
  };

  const styles: React.CSSProperties = {
    top: position.y,
    left: position.x,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <DraggableWrapper>
      <article
        ref={innerRef}
        className={classNames(
          'rounded-lg bg-white min-w-[240px] max-w-fit absolute transition-[shadow,_border] hover:shadow-[0_4px_6px_0_rgb(0_0_0_/_0.05)] group border hover:border-indigo-400',
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
        <div
          className="flex flex-col overflow-hidden transition-[max-height]"
          style={{ maxHeight: visible ? height : undefined }}
        >
          {visible
            ? visible({
                ref: visibleRef,
                dragging: isDragging,
                onExpand: onExpandToggle,
              })
            : null}
          {invisible
            ? invisible({
                ref: invisibleRef,
                dragging: isDragging,
                onExpand: onExpandToggle,
              })
            : null}
        </div>
        {children}
      </article>
    </DraggableWrapper>
  );
};
