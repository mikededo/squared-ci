import { create } from 'zustand';

import type { ThemeModes } from '@/domain/local-storage';
import { LS } from '@/domain/local-storage';

type State = {
  mode: ThemeModes;
};
type Actions = {
  onToggleMode: (mode?: ThemeModes) => void;
  onLoadMode: () => void;
};

const setHTMLThemeClass = (mode: ThemeModes) => {
  document.documentElement.className = '';
  document.documentElement.classList.add(mode);
};

const themeMode = create<State & Actions>()((set, get) => ({
  mode: 'light',
  onToggleMode: (mode) => {
    const newMode = mode ?? (get().mode === 'light' ? 'dark' : 'light');

    set({ mode: newMode });
    setHTMLThemeClass(newMode);
    LS.set('themeMode', newMode);
  },
  onLoadMode: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const mode = LS.get('themeMode');
    if (mode) {
      set({ mode });
      setHTMLThemeClass(mode);
    }
  },
}));

export const useThemeMode = () =>
  themeMode(({ mode, onToggleMode }) => ({ mode, onToggleMode }));

export const useThemeModeLoader = () =>
  themeMode(({ onLoadMode }) => ({ onLoadMode }));
