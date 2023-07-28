import { MoonIcon } from '@primer/octicons-react';
import React, { useEffect } from 'react';

import { IconButton } from '@/sd';
import { useFeatureSwitch, useThemeMode } from '@/stores';

export const DarkThemeMenuOption: React.FC = () => {
  const { fsDarkTheme } = useFeatureSwitch('fsDarkTheme');
  const { mode, onToggleMode } = useThemeMode();

  const handleOnClick = () => {
    onToggleMode();
  };

  useEffect(() => {
    if (!fsDarkTheme) {
      // force light mode
      onToggleMode('light');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fsDarkTheme]);

  return (
    <IconButton
      className="!p-2"
      selected={mode === 'dark'}
      disabled={!fsDarkTheme}
      onClick={handleOnClick}
    >
      <MoonIcon />
    </IconButton>
  );
};
