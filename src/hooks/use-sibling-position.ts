import { atom, useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';

import { useViewport } from '@/hooks';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type DotPosition = 'top' | 'left' | 'bottom' | 'right';

const getNextX = (
  left: number,
  width: number,
  max: number,
  factor = 64
): number =>
  left + width + factor >= max ? left - factor : left + width + factor;

const getNextY = (top: number, max: number, factor = 64): number =>
  top + factor >= max ? top - factor : top;

const ScalingFactor = 0.5;
const TwoCurveLimit = 100;
const updateRefRect = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  cb: (rect: Rect) => void
) => {
  if (!ref) {
    return;
  }

  const rect = ref.current?.getBoundingClientRect();
  if (!rect) {
    return;
  }

  cb({
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  });
};

const calculateProperties = (
  origin: Rect | null,
  destination: Rect | null,
  screen: ReturnType<typeof useViewport>
) => {
  const initialSiblingX = getNextX(
    origin?.x ?? 0,
    origin?.width ?? 0,
    screen.height
  );
  const initialSiblingY = getNextY(origin?.y ?? 0, screen.height);

  // Helper values
  const originX = origin ? origin.x + origin.width : 0;
  const originY = origin ? origin.y + origin.height / 2 : 0;
  const destinationX = destination ? destination.x : initialSiblingX;
  const destinationY = destination
    ? destination.y + destination.height / 2
    : initialSiblingY;

  const deltaX = originX - destinationX;
  const deltaY = originY - destinationY;

  const originDotPosition: DotPosition =
    deltaX - (origin?.width ?? 0) / 2 < 0 ? 'right' : 'left';

  const controlPointX =
    (originX + destinationX) / 2 - Math.abs(deltaX) * ScalingFactor;

  const path = `M ${
    originDotPosition === 'right' ? originX : originX - (origin?.width ?? 0)
  },${originY} C ${
    controlPointX *
    (Math.abs(deltaY) < TwoCurveLimit
      ? 1
      : Math.min(
          1.5,
          deltaX < 0 ? destinationX / originX : originX / destinationX
        ))
  },${originY} ${controlPointX},${destinationY} ${destinationX},${destinationY}`;

  return {
    initialSiblingX,
    initialSiblingY,
    path,
    originDotPosition,
  };
};

export const useSiblingPath = <T extends HTMLElement>() => {
  const screen = useViewport();
  const originRef = useRef<T>(null);
  const destinationRef = useRef<T>(null);

  const [originRect, setOriginRect] = useAtom(
    useMemo(() => atom<Rect | null>(null), [])
  );
  const [destinationRect, setDestinationRect] = useAtom(
    useMemo(() => atom<Rect | null>(null), [])
  );

  const updateOrigin = () => {
    updateRefRect(originRef, (rect) => {
      setOriginRect({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    });
  };

  const updateDestination = () => {
    updateRefRect(destinationRef, (rect) => {
      setDestinationRect({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    });
  };

  useEffect(() => {
    updateOrigin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originRef]);

  useEffect(() => {
    updateDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationRef]);

  const { initialSiblingX, initialSiblingY, path, originDotPosition } =
    calculateProperties(originRect, destinationRect, screen);

  return {
    originRef,
    destinationRef,
    nextX: initialSiblingX,
    nextY: initialSiblingY,
    originDotPosition,
    arrowPath: path,
    onPositionChange: () => {
      // We force to update one of the elements, otherwise references
      // will not detect x and y position changes
      updateOrigin();
      updateDestination();
    },
  };
};
