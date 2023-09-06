//@ts-nocheck

import { atom } from "jotai";
import { Theme, themes, ThemeNames } from "./theme";

/**
 * header bar
 */
export const searchQueryAtom = atom<string>("");
export const searchInputHasFocusAtom = atom<boolean>(false);

/**
 * theme
 * TODO: object possibly undefined error
 */

const activeThemeId = atom<ThemeNames>("dark");

export const activeThemeAtom = atom<Theme>((get) => {
  const themeId = get(activeThemeId);
  const themeIndex = themes.findIndex((t) => t.id === themeId);
  if (themeIndex >= 0) {
    return themes[themeIndex].theme;
  } else {
    return themes[0].theme;
  }
});
