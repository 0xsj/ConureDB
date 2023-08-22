import React from "react";
import { Flex, Screen } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex maxHeight={200} grow centered></Flex>
      <BottomTab />
    </Screen>
  );
}
