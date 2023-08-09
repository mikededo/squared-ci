import { atom } from 'jotai';

import type { OriginPosition, Position } from '@/editor/domain/shared';

type PositionAtom = { dragging: boolean } & Position & OriginPosition;
type PositionState = Position;
type OffsetPositionState = OriginPosition;
type DragState = Pick<PositionAtom, 'dragging'>;
type AtomUpdate =
  | { dragging: false }
  | ({ dragging: true } & OffsetPositionState)
  | (Partial<DragState> & PositionState & { force?: boolean });

const SnapRatio = 1;
const snapPosition = ({ x, y }: PositionState): PositionState => ({
  x: Math.round(x / SnapRatio) * SnapRatio,
  y: Math.round(y / SnapRatio) * SnapRatio,
});

type DraggableAtomArgs = PositionState & {
  absoluteValue?: boolean;
};

export const draggableAtom = ({
  x,
  y,
  absoluteValue = true,
}: DraggableAtomArgs) => {
  const initialState: PositionAtom = {
    dragging: false,
    x: x,
    y: y,
    ox: 0,
    oy: 0,
  };

  const base = atom(initialState);
  const derived = atom<PositionAtom, AtomUpdate[], void>(
    (get) => get(base),
    (get, set, nextPosition) => {
      const current = get(base);

      if (nextPosition.dragging !== undefined) {
        set(base, { ...current, ...nextPosition });
        return;
      }

      if (!current.dragging && !nextPosition.force) {
        return;
      }

      const x = nextPosition.x - current.ox;
      const y = nextPosition.y - current.oy;
      const snappedPosition: PositionAtom = {
        ...current,
        ...snapPosition({
          x: absoluteValue ? Math.abs(x) : x,
          y: absoluteValue ? Math.abs(y) : y,
        }),
      };
      set(base, snappedPosition);
    },
  );

  return derived;
};
