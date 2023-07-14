import type { PropsWithChildren } from 'react';

export type RequiredChildrenFC<T = NonNullable<unknown>> = React.FC<
  Required<PropsWithChildren<T>>
>;
export type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;
