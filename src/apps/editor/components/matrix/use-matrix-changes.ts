import { atom, useAtom } from 'jotai';

const changesAtom = atom(false);

// TODO: Implement as a redo/undo stack
export const useMatrixChanges = () => {
  const [changes, setChanges] = useAtom(changesAtom);

  const handleOnChange = () => {
    if (changes) {
      return;
    }

    setChanges(true);
  };

  return { changes, onChange: handleOnChange };
};
