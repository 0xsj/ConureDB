import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Flex, Pressable, Screen, Text } from "../components";
import { RootStackParamList } from "../navigation/navigation";
import { useNavigation } from "@react-navigation/native";

type NoteScreenProps = NativeStackScreenProps<RootStackParamList> & {
  children?: React.ReactNode;
};

export function NoteScreen({ navigation }: NoteScreenProps) {
  const navigate = useNavigation();
  return (
    <Screen>
      <Flex>
        <Pressable onPress={() => navigate.navigate("home")}>
          <Text color={"white"}>note </Text>
        </Pressable>
      </Flex>
    </Screen>
  );
}
