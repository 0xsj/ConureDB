import React from "react";
import { Flex, Screen, Spacer } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { SearchBar, BottomTab } from "../components";
import { NotePreview } from "../components/notes";
import { MasonryFlashList } from "@shopify/flash-list";
import { trpc } from "../utils/trpc";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  console.log(navigation);
  return (
    <Screen bg="$background" edges={["top"]}>
      <Spacer height={100} />
      <Flex grow>
        <MasonryFlashList
          data={[]}
          numColumns={2}
          renderItem={({ item }) => (
            <NotePreview
              onPress={() => navigation.navigate("note")}
              item={item}
            />
          )}
          estimatedItemSize={200}
        />
      </Flex>
      <SearchBar navigation={navigation} />
    </Screen>
  );
}
