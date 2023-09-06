import React from "react";
import { Flex, Screen } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import { NotePreview } from "../components/notes";
import { Text } from "../components/atoms";
import { MasonryFlashList } from "@shopify/flash-list";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Flex grow justifyContent={"center"}>
        <MasonryFlashList
          data={[1, 2, 3, 4, 5, 6]}
          numColumns={2}
          renderItem={({ item }) => (
            <Text color={"white"}>{item.toString()}</Text>
          )}
        />
      </Flex>
      <BottomTab />
    </Screen>
  );
}
