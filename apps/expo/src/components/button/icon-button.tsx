import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "../atoms";
import {
  ColorProps,
  SpacingProps,
  SpacingShorthandProps,
} from "@shopify/restyle";
import { Theme } from "../../theme";

interface Props {
  color?: string;
  size?: string;
  onPress?: () => void;
  name: string;
}

type RestyleProps = SpacingProps<Theme> & SpacingShorthandProps<Theme>;

type IconButtonProps = Omit<Props, "color"> &
  ColorProps<Theme> & {
    size?: RestyleProps;
  };

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { name, onPress, color, size = "10", ...rest } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      backgroundColor={color}
      //@ts-expect-error
      p={size}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"rounded"}
      {...rest}
    >
      {/* @ts-expect-error */}
      <Feather name={name} color={"white"} size={24} />
    </TouchableOpacity>
  );
};
