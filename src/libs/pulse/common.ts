export type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;
export type Maybe<A> = A | null | undefined;
