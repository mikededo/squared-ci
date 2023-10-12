import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

export const useDialog = () => {
  const [showDialog, setShowDialog] = useAtom(useMemo(() => atom(false), []));

  const onToggleDialog = () => {
    setShowDialog((prev) => !prev);
  };

  const onHideDialog = () => {
    setShowDialog(false);
  };

  const onShowDialog = () => {
    setShowDialog(true);
  };

  return {
    show: showDialog,
    onToggleDialog,
    onHideDialog,
    onShowDialog,
  };
};
