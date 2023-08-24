import React from "react";
import { Flex, Screen } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import { ContributionCalendar } from "../components/calendar/contribution";
import { DonutChart } from "../components/charts/activity-ring/activity";
type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex grow justifyContent={"center"}>
        {/* <ContributionCalendar /> */}
        <DonutChart />
        {/* <CalendarListScreen /> */}
        {/* <AgendaScreen /> */}
      </Flex>
      <BottomTab />
    </Screen>
  );
}
