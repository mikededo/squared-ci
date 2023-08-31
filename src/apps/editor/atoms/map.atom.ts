import { atom } from 'jotai';

type Key = string | number | symbol;

type Add<K extends Key, V> = [K, V];
type Delete<K extends Key> = K;
type UpdateMany<K extends Key, V> = [K, V][];
type Updaters<K extends Key, V> =
  | ['add', Add<K, V>]
  | ['delete', Delete<K>]
  | ['update-many', UpdateMany<K, V>];

export const mapAtom = <K extends Key, V>() => {
  const base = atom<Record<K, V>>({} as Record<K, V>);
  const derived = atom<Record<K, V>, Updaters<K, V>[], void>(
    (get) => get(base),
    (get, set, [action, updaterValue]) => {
      const cloned = { ...get(base) };
      if (action === 'add') {
        const [key, value] = updaterValue;
        cloned[key] = value;
      } else if (action === 'delete') {
        delete cloned[updaterValue];
      } else if (action === 'update-many') {
        updaterValue.forEach(([key, value]) => {
          if (cloned[key] === undefined) {
            cloned[key] = value;
          }
        });
      }

      set(base, cloned);
    },
  );

  return derived;
};
