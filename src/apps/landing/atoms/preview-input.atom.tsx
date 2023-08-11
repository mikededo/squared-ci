import { atom } from 'jotai';

type PreviewAtom = {
  value: string;
  focused: boolean;
};

export const previewInputAtom = () => {
  const base = atom({ value: '', focused: false });
  const derived = atom<PreviewAtom, Partial<PreviewAtom>[], void>(
    (get) => get(base),
    (get, set, update) => {
      set(base, {
        value: update.value ?? get(base).value,
        focused: update.focused ?? get(base).focused,
      });
    },
  );

  return derived;
};
