import type { StateCreator } from 'zustand';

import type { GlobalDragStore, GlobalStore } from './types';

export const globalDragStore: StateCreator<
  GlobalStore,
  [],
  [],
  GlobalDragStore
> = (set, get) => ({
  x: 0,
  y: 0,
  ox: 0,
  oy: 0,
  isDragging: false,
  onDragStart: (e) => {
    if (!e || !get().fsGlobalDrag) {
      return;
    }

    set({ isDragging: true, ox: e.clientX, oy: e.clientY });
  },
  onDragEnd: () => {
    if (!get().fsGlobalDrag) {
      return;
    }

    set({ isDragging: false });
  },
  onDragChange: (e) => {
    if (!e || !get().isDragging) {
      return;
    }

    set({ x: get().x + e.movementX, y: get().y + e.movementY });
  },
});
