import { atom } from 'jotai';

// Define the atom to store the active theme
export const activeThemeAtom = atom('light');

// Create a function to toggle the theme
export const toggleTheme = currentTheme => {
  return currentTheme === 'light' ? 'dark' : 'light';
};
