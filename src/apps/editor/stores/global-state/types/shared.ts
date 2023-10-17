export type Empty<R = void> = () => R;
export type Single<T, R = void> = (arg0: T) => R;
export type Double<F, S, R = void> = (arg0: F, arg1: S) => R;
export type Triple<F, S, T, R = void> = (arg0: F, arg1: S, arg2: T) => R;
