import React from "react";
import { Flex, Screen } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import { ContributionGraph } from "react-native-chart-kit";
import { Calendar } from "../components/charts/calendar/calendar";
type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const chartConfig = {
    // backgroundGradientFrom: "red", // Start color for the background gradient
    // backgroundGradientTo: "red", // End color for the background gradient
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Text color
    strokeWidth: 2, // Width of the border around each square
    decimalPlaces: 0, // Number of decimal places to round the text to (0 means no decimal places)
  };

  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 },
  ];
  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex grow justifyContent={"center"}>
        <Calendar />
      </Flex>
      <BottomTab />
    </Screen>
  );
}
