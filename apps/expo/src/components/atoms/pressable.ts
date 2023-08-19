import {
  Pressable as NativePressable,
  PressableProps as NativePressableProps,
} from "react-native";
import { Theme } from "../../theme";
import { createBox } from "@shopify/restyle";

export const Pressable = createBox<Theme, NativePressableProps>(
  NativePressable,
);
export type PressableProps = React.ComponentProps<typeof Pressable>;
