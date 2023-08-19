import React from "react";

import { Box, Flex, Screen } from "../components";
import { Avatar, Text } from "../components/atoms";
import { trpc } from "../utils/trpc";
import { AppStackParamList, AppStackScreenProp } from "../navigation/types";
import { Screens } from "../navigation/screens";
import { RootStackParamList } from "../navigation/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackButton } from "../components/button/back-button";
import { Calendar } from "../components/calendar/calendar";
import { CalenderScreen } from "../components/calendar/screen";
import { IconButton } from "../components/button";
type AnalyticsScreenProps = NativeStackScreenProps<RootStackParamList>;

export function AnalyticsScreen({ navigation }: AnalyticsScreenProps) {
  const postQuery = trpc.todo.all.useQuery();
  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <Screen bg="$background" edges={["top"]}>
      <Box>
        <IconButton
          onPress={() => navigation.goBack()}
          name="chevron-left"
          color="grey"
          size="10"
        />
      </Box>

      <Flex centered grow>
        <CalenderScreen />
      </Flex>
    </Screen>
  );
}
