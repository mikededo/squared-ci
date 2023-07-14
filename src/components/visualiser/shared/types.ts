import type { PropsWithChildren } from 'react';

export type RequiredChildrenFC<T = NonNullable<unknown>> = React.FC<
  Required<PropsWithChildren<T>>
>;
