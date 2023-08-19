import React from "react";
import { Flex, Screen } from "../components";
import { Text } from "../components/atoms";
import { trpc } from "../utils/trpc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import { AnimatedFlashList } from "../components/layout/animated-flasthlist";
import { TodoItem } from "../components/todo/todo-item";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const postQuery = trpc.todo.all.useQuery();

  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex maxHeight={200} grow centered></Flex>
      <AnimatedFlashList
        data={postQuery.data}
        renderItem={({ item }) => <TodoItem item={item} />}
        ListEmptyComponent={() => <Text>Empty</Text>}
        estimatedItemSize={30}
      />
      <BottomTab />
    </Screen>
  );
}
