import Animated, { AnimateProps } from "react-native-reanimated";
import { Theme } from "../../theme";
import { createBox } from "@shopify/restyle";
import { ViewProps } from "react-native";

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;
// export const AnimatedBox = Animated.createAnimatedComponent(Box);
export const AnimatedBox = createBox<Theme, AnimateProps<ViewProps>>(
  Animated.View,
);
