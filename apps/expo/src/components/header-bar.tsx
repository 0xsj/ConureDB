import { Flex } from "../components/layout";
import { Text, TextInput } from "./atoms";
import { FeatherIcon } from "./atoms";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AnimatedBox } from "./layout/box";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

export const HeaderBar: React.FC = () => {
  const navigation = useNavigation();
  const safeAreainsets = useSafeAreaInsets();

  const safeAreaStyle = useAnimatedStyle(() => ({
    // opacity: withTiming;
  }));

  return (
    <AnimatedBox position={"absolute"} right={0} left={0} px={"lg"}>
      <AnimatedBox
        borderRadius={"rounded"}
        bg={"$header"}
        top={safeAreainsets.top}
      >
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
