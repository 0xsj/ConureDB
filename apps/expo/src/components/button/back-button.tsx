import { useNavigation } from "@react-navigation/native";
import { IconButton } from "./icon-button";
import { Box } from "../layout";

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      onPress={() => navigation.goBack()}
      name="chevron-left"
      color="grey"
      size="10"
    />
  );
};
