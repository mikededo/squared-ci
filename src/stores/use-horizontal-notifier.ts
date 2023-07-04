import { create } from 'zustand';

import { Trigger } from '@/domain/trigger';
import { useViewport } from '@/hooks';

import {
  DotPosition,
  Rect,
  calculateProperties,
} from './use-horizontal-notifier.helpers';

type Screen = ReturnType<typeof useViewport>;
type WithScreen<T extends object, F = void> = (
  args: T & { screen: Screen }
) => F;
type Listeners = Record<Trigger, string>;
type Destinations = Record<Trigger, Rect>;
type State = {
  origin: Rect | null;
  destinations: Destinations;
  listeners: Listeners;
};
type Actions = {
  addOrigin: (origin: Rect) => void;
  addDestination: WithScreen<
    {
      trigger: Trigger;
      initialRect: Rect;
    },
    { initialX: number; initialY: number; dotPosition: DotPosition } | undefined
  >;
  removeDestination: (key: Trigger) => void;
  addListener: (key: Trigger) => void;
  removeListener: (key: Trigger) => void;
  onParentChange: WithScreen<{ rect: Rect }>;
  onDestinationChange: WithScreen<{ trigger: Trigger; destination: Rect }>;
};

const horizontalPathCommunication = create<State & Actions>()((set, get) => ({
  origin: null,
  destinations: {} as Destinations,
  listeners: {} as Listeners,
  addOrigin: (origin) => {
    set({ origin });
  },
  addDestination: ({ trigger, initialRect, screen }) => {
    const { origin, destinations } = get();
    if (!origin || destinations[trigger]) {
      return;
    }

    const { initialSiblingX, initialSiblingY, path, destinationDotPosition } =
      calculateProperties(origin, initialRect, screen);

    set((state) => ({
      destinations: { ...state.destinations, [trigger]: initialRect },
      listeners: { ...state.listeners, [trigger]: path },
    }));
    return {
      initialX: initialSiblingX,
      initialY: initialSiblingY,
      dotPosition: destinationDotPosition,
    };
  },
  removeDestination: (trigger) => {
    const { listeners } = get();
    if (!listeners[trigger]) {
      return;
    }
    set((state) => {
      const updated = { ...state.destinations };
      delete updated[trigger];
      return { destinations: updated };
    });
  },
  addListener: (trigger) => {
    set((state) => ({
      listeners: {
        ...state.listeners,
        [trigger]: state.listeners[trigger] ?? '',
      },
    }));
  },
  removeListener: (trigger) => {
    const { listeners } = get();
    if (!listeners[trigger]) {
      return;
    }
    set((state) => {
      const updated = { ...state.listeners };
      delete updated[trigger];
      return { listeners: updated };
    });
  },
  onParentChange: ({ rect: origin, screen }) => {
    const { destinations, listeners } = get();
    if (!parent) {
      return;
    }
    if (
      Object.keys(listeners).length === 0 ||
      Object.keys(destinations).length === 0
    ) {
      // Update only the parent
      set({ origin });
      return;
    }

    // Check destinations with listeners
    const updatedListeners = {} as Listeners;
    (Object.keys(listeners) as Trigger[]).forEach((trigger) => {
      if (!destinations[trigger]) {
        return;
      }

      const { path } = calculateProperties(
        origin,
        destinations[trigger],
        screen
      );
      updatedListeners[trigger] = path;
    });
    set({ origin, listeners: updatedListeners });
  },
  onDestinationChange: ({ trigger, destination, screen }) => {
    const { origin, destinations, listeners } = get();
    if (!parent) {
      return;
    }

    const listener = listeners[trigger];
    if (!listener) {
      return;
    }

    const { path } = calculateProperties(origin, destination, screen);
    set({
      destinations: { ...destinations, [trigger]: destination },
      listeners: { ...listeners, [trigger]: path },
    });
  },
}));

export const useHorizontalListener = () =>
  horizontalPathCommunication(({ addListener, removeListener, listeners }) => ({
    addListener,
    removeListener,
    listeners,
  }));
export const useHorizontalDestination = () =>
  horizontalPathCommunication(
    ({ addDestination, removeDestination, onDestinationChange }) => ({
      addDestination,
      removeDestination,
      onDestinationChange,
    })
  );
export const useHorizontalOrigin = () =>
  horizontalPathCommunication(({ addOrigin, onParentChange }) => ({
    addOrigin,
    onParentChange,
  }));
