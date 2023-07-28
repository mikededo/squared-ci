import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

import type { InitialPosition, Position } from '@/domain/shared';
import { useDraggable, useExpandable } from '@/hooks';
import { DraggableWrapper, isEventFromDataDraggable } from '@/sd';
import { useFeatureSwitch, useGlobalDragListener } from '@/stores';

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
  visible?: RenderFn;
  invisible?: RenderFn;
  innerRef?: React.LegacyRef<HTMLElement>;
  onPositionChange?: (position: Position) => void;
} & InitialPosition;

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
  const { fsGlobalDrag } = useFeatureSwitch('fsGlobalDrag');
  const { x, y } = useGlobalDragListener();

  const handleOnDragStart = (e: React.MouseEvent<HTMLElement>) => {
    if (isEventFromDataDraggable(e)) {
      onDragStart(e);
    }
  };

  const styles: React.CSSProperties = {
    top: position.y + (fsGlobalDrag ? y : 0),
    left: position.x + (fsGlobalDrag ? x : 0),
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <DraggableWrapper>
      <article
        ref={innerRef}
        className={classNames(
          'rounded-lg bg-white min-w-[240px] max-w-fit absolute transition-[shadow,_border] hover:shadow-[0_4px_6px_0_rgb(0_0_0_/_0.05)] group border hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-400 dark:shadow-none',
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
