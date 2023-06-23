import { atom } from 'jotai';

type PositionAtom = {
  dragging: boolean;
  x: number;
  y: number;
  ox: number;
  oy: number;
};
type PositionState = Pick<PositionAtom, 'x' | 'y'>;
type OffsetPositionState = Pick<PositionAtom, 'ox' | 'oy'>;
type DragState = Pick<PositionAtom, 'dragging'>;
type AtomUpdate =
  | { dragging: false }
  | ({ dragging: true } & OffsetPositionState)
  | (Partial<DragState> & PositionState);

const SnapRatio = 1;
const snapPosition = ({ x, y }: PositionState): PositionState => ({
  x: Math.round(x / SnapRatio) * SnapRatio,
  y: Math.round(y / SnapRatio) * SnapRatio,
});

export const draggableAtom = ({
  x,
  y,
}: Partial<Pick<PositionAtom, 'x' | 'y'>> = {}) => {
  const initialState: PositionAtom = {
    dragging: false,
    x: x ?? 140,
    y: y ?? 280,
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

      if (!current.dragging) {
        return;
      }

      const snappedPosition: PositionAtom = {
        ...current,
        ...snapPosition({
          x: Math.abs(nextPosition.x - current.ox),
          y: Math.abs(nextPosition.y - current.oy),
        }),
      };
      set(base, snappedPosition);
    }
  );

  return derived;
};
