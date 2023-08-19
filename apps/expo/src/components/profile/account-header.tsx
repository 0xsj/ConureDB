import { Flex } from "../../components/layout";
import { IconButton } from "../button";
import { useNavigation } from "@react-navigation/native";

export const AccountHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Flex
      position="absolute"
      top={60}
      left={0}
      row
      justifyContent="space-between"
      width="100%"
      zIndex={1}
      px={"2xl"}
    >
      <Flex row>
        <IconButton
          onPress={() => navigation.goBack()}
          name="chevron-left"
          color="grey"
          size="10"
        />
      </Flex>

      <Flex row>
        <IconButton
          //@ts-ignore
          onPress={() => navigation.navigate("settings")}
          name="settings"
          size="10"
          color="grey"
        />
      </Flex>
    </Flex>
  );
};
