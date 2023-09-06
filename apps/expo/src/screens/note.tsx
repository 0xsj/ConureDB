import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Screen, Text } from "../components";
import { RootStackParamList } from "../navigation/navigation";

type AddNoteScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function NoteScreen({ navigation }: AddNoteScreenProps) {
  return (
    <Screen>
      <Flex>
        <Text color={"white"}>ADD NOTE SCREEN</Text>
      </Flex>
    </Screen>
  );
}
