import { create } from 'zustand';

import type { ThemeModes } from '@/editor/domain/local-storage';
import { LS } from '@/editor/domain/local-storage';

export type ExtraColors =
  | 'default'
  | 'green'
  | 'orange'
  | 'magenta'
  | 'red'
  | 'purple';
type State = {
  mode: ThemeModes;
  extra: ExtraColors;
};
type Actions = {
  onToggleMode: (mode?: ThemeModes) => void;
  onLoadMode: () => void;
  onExtraChange: (extra: ExtraColors) => void;
};

const EXTRA_CLASS_NAMES: Record<State['extra'], string> = {
  default: 'extra-default',
  green: 'extra-green',
  orange: 'extra-orange',
  magenta: 'extra-magenta',
  red: 'extra-red',
  purple: 'extra-purple',
};

const setHTMLClass = (cls: string) => {
  const classList = document.documentElement.classList;
  if (classList.contains(cls)) {
    return;
  }

  classList.add(cls);
};

const removeHTMLClass = (cls: string) => {
  const classList = document.documentElement.classList;
  if (!classList.contains(cls)) {
    return;
  }

  classList.remove(cls);
};

const themeMode = create<State & Actions>()((set, get) => ({
  mode: 'light',
  extra: 'default',
  onToggleMode: (mode) => {
    const newMode = mode ?? (get().mode === 'light' ? 'dark' : 'light');

    if (mode || get().mode) {
      removeHTMLClass(mode ?? get().mode);
    }
    setHTMLClass(newMode);
    set({ mode: newMode });
    LS.set('themeMode', newMode);
  },
  onLoadMode: () => {
    if (typeof window === 'undefined') {
      return;
    }

    const mode = LS.get('themeMode');
    if (mode) {
      set({ mode });
      setHTMLClass(mode);
    }
  },
  onExtraChange: (extra) => {
    if (typeof window === 'undefined') {
      return;
    }

    set({ extra });

    Object.values(EXTRA_CLASS_NAMES).forEach(removeHTMLClass);
    if (extra === 'default') {
      return;
    }
    setHTMLClass(EXTRA_CLASS_NAMES[extra]);
  },
}));

export const useThemeMode = () =>
  themeMode(({ mode, onToggleMode }) => ({ mode, onToggleMode }));

export const useThemeModeLoader = () =>
  themeMode(({ onLoadMode }) => ({ onLoadMode }));

export const useExtraModifier = () =>
  themeMode(({ extra, onExtraChange }) => ({ extra, onExtraChange }));
