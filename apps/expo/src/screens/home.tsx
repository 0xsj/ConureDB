import React from "react";
import { Flex, Screen } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import AgendaScreen from "../components/charts/agenda";
type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex grow justifyContent={"center"}>
        {/* <Calendar /> */}
        {/* <CalendarListScreen /> */}
        <AgendaScreen />
      </Flex>
      <BottomTab />
    </Screen>
  );
}
