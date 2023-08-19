import React from "react";

import { Flex, Screen } from "../components";
import { Text } from "../components/atoms";
import { trpc } from "../utils/trpc";
import { AppStackParamList, AppStackScreenProp } from "../navigation/types";
import { Screens } from "../navigation/screens";
import { RootStackParamList } from "../navigation/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList>;

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const postQuery = trpc.todo.all.useQuery();
  const [showPost, setShowPost] = React.useState<string | null>(null);

  return (
    <Screen bg="$background" edges={["top"]}>
      <Flex grow centered>
        <Text>Settings</Text>
        <Text color={"white"} onPress={() => navigation.navigate("home")}>
          go home
        </Text>
      </Flex>
    </Screen>
  );
}
