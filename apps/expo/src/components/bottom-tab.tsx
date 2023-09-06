import { Flex } from "../components/layout";
import { IconButton } from "./button";

type BottomTabProps = {
  navigation: any;
};

export const BottomTab: React.FC<BottomTabProps> = (props) => {
  const { navigation } = props;
  return (
    <Flex
      position="absolute"
      bottom={0}
      left={0}
      alignItems="center"
      width="100%"
      height={100}
    >
      <IconButton
        name="plus"
        size="xl"
        color="$lightBlue"
        onPress={() => navigation.navigate("note")}
      />
    </Flex>
  );
};
