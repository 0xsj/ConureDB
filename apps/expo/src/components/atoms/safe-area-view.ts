import { Theme } from "../../theme";
import { SafeAreaView as NativeSafeAreaView, ViewProps } from "react-native";
import { createBox } from "@shopify/restyle";

export const SafeAreaView = createBox<Theme, ViewProps>(NativeSafeAreaView);
export type SafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>;
