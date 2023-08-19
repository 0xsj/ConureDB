import React from "react";

import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Flex, Screen } from "../components";
import { trpc } from "../utils/trpc";

export const TodoDetailsScreen = () => {
  const postQuery = trpc.todo.all.useQuery();
  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <Screen bg="$background" edges={["top"]}>
      <Flex grow centered>
        <Text>Todo Details</Text>
      </Flex>
    </Screen>
  );
};
