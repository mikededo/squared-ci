import { create } from 'zustand';

type Modes = 'dark' | 'light';
type State = {
  mode: Modes;
};
type Actions = {
  onToggleMode: (mode?: Modes) => void;
  onLoadMode: () => void;
};

const LSKey = 'theme-mode';

const setHTMLThemeClass = (mode: Modes) => {
  document.documentElement.className = '';
  document.documentElement.classList.add(mode);
};

const themeMode = create<State & Actions>()((set, get) => ({
  mode: 'light',
  onToggleMode: (mode) => {
    const newMode = mode ?? (get().mode === 'light' ? 'dark' : 'light');
    set({ mode: newMode });
    window.localStorage.setItem(LSKey, newMode);
    setHTMLThemeClass(newMode);
  },
  onLoadMode: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const mode = window.localStorage.getItem('theme-mode') as Modes;
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
