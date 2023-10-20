import { MoonIcon } from '@primer/octicons-react';
import React from 'react';

import { IconButton } from '@/aero';
import { useThemeMode } from '@/chain';

export const DarkModeToggler = () => {
  const { mode, onToggleMode } = useThemeMode();

  const handleOnClick = () => {
    onToggleMode();
  };

  return (
    <IconButton
      className="!p-2 ml-auto"
      selected={mode === 'dark'}
      onClick={handleOnClick}
    >
      <MoonIcon />
    </IconButton>
  );
};
