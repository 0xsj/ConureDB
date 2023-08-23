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
  // const commitsData = [
  //   { date: "2017-01-02", count: 1 },
  //   { date: "2017-01-03", count: 2 },
  //   { date: "2017-01-04", count: 3 },
  //   { date: "2017-01-05", count: 4 },
  //   { date: "2017-01-06", count: 5 },
  //   { date: "2017-01-30", count: 2 },
  //   { date: "2017-01-31", count: 3 },
  //   { date: "2017-03-01", count: 2 },
  //   { date: "2017-04-02", count: 4 },
  //   { date: "2017-03-05", count: 2 },
  //   { date: "2017-02-30", count: 4 },
  // ];
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
