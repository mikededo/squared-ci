import type { PropsWithChildren } from 'react';

export type RequiredChildrenFC<T = NonNullable<unknown>> = React.FC<
  Required<PropsWithChildren<T>>
>;
export type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;

// Common types
export type Position = { x: number; y: number };
export type OriginPosition = { ox: number; oy: number };
export type InitialPosition = { initialX: number; initialY: number };
