import { Flex } from "../layout";
import { Text } from "../atoms";
import { ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface GoalContributionsProps {}

export const GoalContributions: React.FC<GoalContributionsProps> = (props) => {
  return (
    <Flex>
      <ContributionGraph
        values={[
          { date: "2019-01-02", count: 1 },
          { date: "2019-01-03", count: 2 },
          { date: "2019-01-04", count: 3 },
          { date: "2019-01-05", count: 4 },
          { date: "2019-01-06", count: 5 },
          { date: "2019-01-30", count: 2 },
          { date: "2019-01-31", count: 3 },
          { date: "2019-03-01", count: 2 },
          { date: "2019-04-02", count: 4 },
          { date: "2019-03-05", count: 2 },
          { date: "2019-02-30", count: 4 },
        ]}
        numDays={105}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </Flex>
  );
};
