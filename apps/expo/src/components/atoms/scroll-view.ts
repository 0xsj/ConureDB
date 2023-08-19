import { Theme } from "../../theme";
import {
  ScrollView as NativeScrollView,
  ScrollViewProps as NativeScrollViewProps,
} from "react-native";
import { createBox } from "@shopify/restyle";

export const ScrollView = createBox<Theme, NativeScrollViewProps>(
  NativeScrollView,
);
export type ScrollViewProps = React.ComponentProps<typeof ScrollView>;
