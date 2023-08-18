import type { SetStateAction } from 'jotai';
import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

type ChangesStackOptions = {
  maxChanges: number;
};

const DefaultOptions: ChangesStackOptions = {
  maxChanges: 10,
};

const undoToRedo = <T>(
  undoStack: T[],
  setUndoStack: (_: SetStateAction<T[]>) => void,
  setRedoStack: (_: SetStateAction<T[]>) => void,
  { maxChanges }: ChangesStackOptions,
) => {
  if (undoStack.length === 0) {
    return undefined;
  }

  const lastChange = undoStack.at(-1);
  setUndoStack((stack) => {
    const updated = [...stack];
    updated.pop();
    return updated;
  });
  setRedoStack((stack) => {
    if (!lastChange) {
      return stack;
    }

    const updated = [...stack];
    if (updated.length === maxChanges) {
      updated.shift();
    }
    updated.push(lastChange);

    return updated;
  });

  return lastChange;
};

export const useChangesStack = <T>({
  maxChanges,
}: ChangesStackOptions = DefaultOptions) => {
  const [undoStack, setUndoStack] = useAtom(useMemo(() => atom<T[]>([]), []));
  const [redoStack, setRedoStack] = useAtom(useMemo(() => atom<T[]>([]), []));

  const handleOnChange = (change: T) => {
    setUndoStack((stack) => {
      const updated = [...stack];
      if (updated.length === maxChanges) {
        updated.shift();
      }
      updated.push(change);

      return updated;
    });
    setRedoStack([]);
  };

  const handleOnUndo = (): T | undefined =>
    undoToRedo(undoStack, setUndoStack, setRedoStack, { maxChanges });

  const handleOnRedo = (): T | undefined =>
    undoToRedo(redoStack, setRedoStack, setUndoStack, { maxChanges });

  return {
    hasChanges: undoStack.length > 0,
    onChange: handleOnChange,
    onUndo: handleOnUndo,
    onRedo: handleOnRedo,
  };
};
