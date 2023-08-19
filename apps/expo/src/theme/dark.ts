import { createTheme } from "@shopify/restyle";
import light, { Theme } from "./light";
import { StatusBarStyle } from "react-native";

export const p = {
  white: "#FFFFFF",
  black: "#0C0D0F",
  primary: "#2C66FF",
  negative: "#E01A00",
  warning: "#FFC042",
  positive: "#20AF0B",
  $primaryDark1: "#071655",
  $primaryDark2: "#0C288D",
  $primary: "#2C66FF",
  $primaryLight1: "#6891FF",
  $primaryLight2: "#9DB8FD",
  $primaryLight3: "#ECEFFE",
  $positiveDark1: "#125309",
  $positiveDark2: "#0E3F07",
  $positive: "#29BD13",
  $positiveLight1: "#07D571",
  $positiveLight2: "#93ECC1",
  $positiveLight3: "#D3FDE9",
  $negativeDark1: "#A31300",
  $negativeDark2: "#47110D",
  $negative: "#FF382D",
  $negativeLight1: "#FF958D",
  $negativeLight2: "#FFC7C3",
  $negativeLight3: "#FFE6E4",
  $warningDark1: "#BE9122",
  $warningDark2: "#684F13",
  $warning: "#FFC22E",
  $warningLight1: "#FFD175",
  $warningLight2: "#FFE2A8",
  $warningLight3: "#FFF7E6",
  $black: "#141316",
  $white: "#FFFFFF",
  $grey1: "#383D48",
  $grey2: "#212329",
  $grey3: "#7E8494",
  $grey4: "#8DC0CE",
  $grey5: "#636363",
  $grey6: "#F4F5F8",

  slate00: "#1b1c1d",
  slate10: "#202225",
  slate20: "#292c2f",
  slate30: "#2e3235",
  slate40: "#35393d",
  slate100: "#767577",
  slate900: "#dddddd",
  blue70: "#2185d0",

  lightBlue: "#5E8EFB",
  teal: "#9CECFD",
  lemon: "#FFF970",
  navy: "#111C2E",
  navyTransparent: "rgba(17, 28, 46, 0.1)",
};

export const theme: Theme = createTheme({
  ...light,
  colors: {
    ...light.colors,
    black: p.black,
    white: p.white,
    primary: p.primary,
    warning: p.warning,
    negative: p.negative,
    positive: p.positive,

    $foreground: p.white,
    $background: p.navy,
    // $teal: p.teal,
    // $yellow: p.lemon,
    // $lightBlue: p.lightBlue,
    // transparent: p.navyTransparent,
  },
  statusBar: {
    barStyle: "light-content" as StatusBarStyle,
  },
  barVariants: {
    headerBar: {
      bg: "$headerBarBackground",
      borderRadius: "hg",
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
  },
});

export default theme;
