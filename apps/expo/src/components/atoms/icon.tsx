import { Theme } from "../../theme";
import { ColorProps, useResponsiveProp, useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";

export type IconProps = React.ComponentProps<typeof Feather>;
type Props = Omit<IconProps, "color"> & ColorProps<Theme>;

export const FeatherIcon: React.FC<Props> = (props) => {
  const { color = "$foreground", ...rest } = props;
  const theme = useTheme<Theme>();
  const colorProp = useResponsiveProp(color);
  const vColor = theme.colors[colorProp || "$foreground"];
  return <Feather {...rest} color={vColor} />;
};
