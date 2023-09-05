import { Flex } from "../components/layout";
import { Text, TextInput } from "./atoms";
import { FeatherIcon } from "./atoms";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { useNavigation } from "@react-navigation/native";
import { AnimatedBox } from "./layout/box";

export const HeaderBar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <AnimatedBox position={"absolute"} top={30} right={0} left={0} px={"lg"}>
      <AnimatedBox bg={"white"}>
        <Flex>
          <FeatherIcon name="menu" size={18} color={"grey3"} />
        </Flex>
        <Flex>
          <TextInput color={"$foreground"} placeholder="search text" />
        </Flex>
      </AnimatedBox>
    </AnimatedBox>
  );
};
