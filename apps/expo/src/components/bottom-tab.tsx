import { Flex } from "../components/layout";
import { IconButton } from "./button";

export const BottomTab: React.FC = () => {
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
        onPress={() => console.log("111111")}
        name="plus"
        size="xl"
        color="$lightBlue"
      />
    </Flex>
  );
};
