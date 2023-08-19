import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Theme } from "../../theme";
import { Box, BoxProps } from "../layout/box";

export const Bar = createRestyleComponent<
  VariantProps<Theme, "barVariants"> & BoxProps,
  Theme
>([createVariant({ themeKey: "barVariants" })], Box);
