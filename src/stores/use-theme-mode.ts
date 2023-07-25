import { create } from 'zustand';

type Modes = 'dark' | 'light';
type State = {
  mode: Modes;
};
type Actions = {
  onToggleMode: () => void;
  onLoadMode: () => void;
};

const LSKey = 'theme-mode';

const themeMode = create<State & Actions>()((set, get) => ({
  mode: 'light',
  onToggleMode: () => {
    const mode = get().mode === 'light' ? 'dark' : 'light';
    set({ mode });
    window.localStorage.setItem(LSKey, mode);
  },
  onLoadMode: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const mode = window.localStorage.getItem('theme-mode') as Modes;
    if (mode) {
      set({ mode });
    }
  },
}));

export const useThemeMode = () =>
  themeMode(({ mode, onToggleMode }) => ({ mode, onToggleMode }));

export const useThemeModeLoader = () =>
  themeMode(({ onLoadMode }) => ({ onLoadMode }));
