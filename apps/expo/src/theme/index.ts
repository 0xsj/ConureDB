import light, { Theme } from "./light";
import dark from "./dark";
import { atom } from "jotai";

export type ThemeNames = "light" | "dark";

export interface ThemeMeta {
  id: ThemeNames;
  name: string;
  theme: Theme;
}

export const themes: readonly ThemeMeta[] = [
  {
    id: "light",
    name: "default light",
    theme: light,
  },
  {
    id: "dark",
    name: "default dark",
    theme: dark,
  },
];

export type { Theme };

export const activeThemeId = atom<ThemeNames>("light");
