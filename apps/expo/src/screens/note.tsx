import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Pressable, Screen, Text } from "../components";
import { RootStackParamList } from "../navigation/navigation";

type NoteScreenProps = NativeStackScreenProps<RootStackParamList, "note"> & {
  children?: React.ReactNode;
};

export function NoteScreen({ navigation }: NoteScreenProps) {
  return (
    <Screen>
      <Flex grow centered>
        <Pressable onPress={() => navigation.navigate("home")}>
          <Text color={"white"}>note </Text>
        </Pressable>
      </Flex>
    </Screen>
  );
}
