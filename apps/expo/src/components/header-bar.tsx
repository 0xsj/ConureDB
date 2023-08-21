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
    ></Flex>
  );
};
