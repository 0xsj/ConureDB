import { Flex } from "../components/layout";
import { IconButton } from "./button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { useNavigation } from "@react-navigation/native";

export const HeaderBar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Flex
      position="absolute"
      top={60}
      left={0}
      backgroundColor="$background"
      row
      justifyContent="space-between"
      width="100%"
      zIndex={1}
      px={"2xl"}
    >
      <Flex row>
        <IconButton
          //@ts-expect-error
          onPress={() => navigation.navigate("profile")}
          name="user"
          color="grey"
          size="10"
        />
      </Flex>

      <Flex row>
        <IconButton
          //@ts-expect-error
          onPress={() => navigation.navigate("analytics")}
          name="bell"
          size="10"
          color="grey"
        />
        <IconButton
          onPress={() => console.log("add")}
          name="plus"
          color="grey"
        />
      </Flex>
    </Flex>
  );
};
