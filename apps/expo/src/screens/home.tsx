import React from "react";
import { Flex, Screen, Spacer } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { HeaderBar, BottomTab } from "../components";
import { NotePreview } from "../components/notes";
import { MasonryFlashList } from "@shopify/flash-list";
import { trpc } from "../utils/trpc";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const noteQuery = trpc.note.all.useQuery();

  return (
    <Screen bg="$background" edges={["top"]}>
      <HeaderBar />
      <Spacer height={100} />
      <Flex grow>
        <MasonryFlashList
          data={noteQuery.data}
          numColumns={2}
          renderItem={({ item }) => <NotePreview item={item} />}
          estimatedItemSize={200}
        />
      </Flex>

      <BottomTab navigation={navigation} />
    </Screen>
  );
}
