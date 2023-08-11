import type { PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { DraggableWrapper, isEventFromDataDraggable } from '@/aero';
import type { InitialPosition, Position } from '@/editor/domain/shared';
import { useDraggable, useExpandable } from '@/editor/hooks';
import { useFeatureSwitch, useGlobalDragListener } from '@/editor/stores';

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
  visible?: RenderFn;
  invisible?: RenderFn;
  innerRef?: React.LegacyRef<HTMLElement>;
  onPositionChange?: (position: Position) => void;
} & InitialPosition & { id?: string };

/**
 * A draggable component that should be used as a wrapper for any component.
 * The draggable will only work if the component has the `data-draggable`
 * attribute. Since the @param invisible and @param visible are render
 * functions, they will be called every time the component is rendered,
 * therefore, the result is memoized to avoid unnecessary re-renders.
 */
export const Draggable: React.FC<PropsWithChildren<Props>> = ({
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

  // Memoize the render functions' result to avoid re-renderson every drag
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
        className={twMerge(
          'rounded-lg min-w-[240px] max-w-fit absolute transition-colors group border hover:border-extra bg-card',
          isDragging && 'border-extra'
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
        {memoizedChildren}
      </article>
    </DraggableWrapper>
  );
};
