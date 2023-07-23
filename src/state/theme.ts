// state/theme.ts
import { atom, useAtom } from 'jotai';

export const themeAtom = atom<'light' | 'dark'>('light');

export function useThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return { theme, toggleTheme };
}
