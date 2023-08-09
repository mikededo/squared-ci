import { atom, useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';

import type { DotPosition } from '@/aero';
import { Positions } from '@/editor/config';
import type { InitialPosition } from '@/editor/domain/shared';
import type { Trigger } from '@/editor/domain/trigger';
import { useSizeObserver, useViewport } from '@/editor/hooks';
import { useHorizontalDestination } from '@/editor/stores';

type ConnectorPosition = { dotPosition: DotPosition | null } & InitialPosition;

const InitialConnectorPosition: ConnectorPosition = {
  initialX: Positions.BoxTriggerPropsX,
  initialY: Positions.BoxTriggerPropsY,
  dotPosition: 'left',
};

export const useBoxTriggerProps = (trigger: Trigger | null) => {
  const ref = useRef<HTMLDivElement>(null);
  const screen = useViewport();
  const { addDestination, onDestinationChange } = useHorizontalDestination();

  const [initialPosition, setInitialPosition] = useAtom(
    useMemo(() => atom<ConnectorPosition>(InitialConnectorPosition), []),
  );

  const handleOnNotifyListeners = () => {
    if (!trigger || !ref.current) {
      return;
    }

    const { x, y, width, height } = ref.current.getBoundingClientRect();
    onDestinationChange({
      trigger,
      destination: { x, y, width, height },
      screen,
    });
  };

  // The useSizeObserver is used in order to detect when the chip wrapper
  // increases the size of the component, which should also notify the listeners
  // in case the height has increased. Othewise, until the component is dragged,
  // the connector will be misplaced
  useSizeObserver({ element: ref.current, onUpdate: handleOnNotifyListeners });

  useEffect(() => {
    if (!trigger || !ref.current) {
      return;
    }

    const initialPosition = addDestination({
      trigger,
      screen,
      // Only the wanted fields will be used, others will be ignored
      initialRect: ref.current.getBoundingClientRect(),
    });
    if (initialPosition) {
      setInitialPosition(initialPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return {
    ref,
    ...initialPosition,
    onNotifyListeners: handleOnNotifyListeners,
  };
};
