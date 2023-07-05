import type { useViewport } from '@/hooks';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type DotPosition = 'top' | 'left' | 'bottom' | 'right';

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
export const updateRefRect = <T extends HTMLElement>(
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

export const calculateProperties = (
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

  const destinationDotPosition: DotPosition =
    deltaX - (origin?.width ?? 0) / 2 < 0 ? 'right' : 'left';

  const controlPointX =
    (originX + destinationX) / 2 - Math.abs(deltaX) * ScalingFactor;

  const path = `M ${
    destinationDotPosition === 'right'
      ? originX
      : originX - (origin?.width ?? 0)
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
    destinationDotPosition,
  };
};
