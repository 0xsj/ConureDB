import { Box } from "./box";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../theme";

type Props = BoxProps<Theme> & {
  children: React.ReactNode;
  c?: boolean;
  transparent?: boolean;
};

export const Container: React.FC<Props> = (props) => {
  const { transparent, c, children } = props;
  const justify = c ? "center" : undefined;
  const opacity = transparent ? "transparent" : "$background";
  return (
    <Box
      justifyContent={justify}
      alignItems={justify}
      flex={1}
      backgroundColor={opacity}
      {...props}
    >
      {children}
    </Box>
  );
};
