import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';

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
  skipChildrenMemoization?: boolean;
} & InitialPosition & { id?: string };

export const Draggable: React.FC<PropsWithChildren<Props>> = ({
  active,
  initialX,
  initialY,
  innerRef,
  visible,
  invisible,
  children,
  skipChildrenMemoization,
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

  // Memoize the render functions to avoid re-renderson every drag
  const memoizedVisible = React.useMemo(
    () =>
      !visible
        ? null
        : visible({
            ref: visibleRef,
            dragging: isDragging,
            onExpand: onExpandToggle,
          }),
    // isDragging is the only dependency that matters in this case
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragging]
  );
  const memoizedInvisible = React.useMemo(
    () =>
      !invisible
        ? null
        : invisible({
            ref: invisibleRef,
            dragging: isDragging,
            onExpand: onExpandToggle,
          }),
    // isDragging is the only dependency that matters in this case
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragging]
  );
  // Children do not have any dependency with the dragging state
  // therefore it should only be rendered once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedChildren = React.useMemo(() => children, []);

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

  const onDragListener = useCallback(onDrag, [onDrag]);

  useEffect(() => {
    document.addEventListener('mousemove', onDragListener);

    return () => {
      document.removeEventListener('mousemove', onDragListener);
    };
  }, [onDragListener]);

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
        onMouseDown={handleOnDragStart}
        onMouseUp={onDragEnd}
        data-draggable={true}
      >
        <div
          className="flex flex-col overflow-hidden transition-[max-height]"
          style={{ maxHeight: visible ? height : undefined }}
        >
          {memoizedVisible}
          {memoizedInvisible}
        </div>
        {skipChildrenMemoization ? children : memoizedChildren}
      </article>
    </DraggableWrapper>
  );
};
