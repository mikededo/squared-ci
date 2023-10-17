import type { OriginPosition, Position } from '@/editor/domain/shared';

import type { Empty, Single } from './shared';

type GlobalDragState = Position & OriginPosition & { isDragging: boolean };
type GlobalDragActions = {
  onDragStart: Single<React.MouseEvent<HTMLElement, MouseEvent>>;
  onDragEnd: Empty;
  onDragChange: Single<React.MouseEvent<HTMLElement, MouseEvent>>;
};
export type GlobalDragStore = GlobalDragState & GlobalDragActions;
