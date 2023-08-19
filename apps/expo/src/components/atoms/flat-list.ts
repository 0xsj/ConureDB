import { createBox } from "@shopify/restyle";
import { FlatListProps } from "react-native";
import { Theme } from "../../theme";
import Animated, { AnimateProps } from "react-native-reanimated";

// not sure of what its going to be for now
export const FlatList = createBox<Theme, AnimateProps<FlatListProps<unknown>>>(
  Animated.FlatList,
);
