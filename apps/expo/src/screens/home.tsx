import React from "react";
import { Flex, Screen } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import { CalendarList } from "../components/calendar/list";
import { ContributionCalendar } from "../components/calendar/contribution";
import AgendaScreen from "../components/calendar/agenda";
import { AgendaList } from "../components/calendar/agenda-list";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex grow justifyContent={"center"}>
        {/* <CalendarList /> */}
        {/* <AgendaList /> */}
        <AgendaScreen />
        {/* <ContributionCalendar /> */}
      </Flex>
      <BottomTab />
    </Screen>
  );
}
