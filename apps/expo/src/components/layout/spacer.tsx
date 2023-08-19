import { Box, BoxProps } from "../layout/box";
import { Theme } from "../../theme";
import theme from "../../theme/dark";

export type SpacerProps = BoxProps & {
  x?: keyof Theme["spacing"];
  y?: keyof Theme["spacing"];
};

export function Spacer({ x, y, ...rest }: SpacerProps): JSX.Element {
  return (
    <Box
      flexGrow={0}
      flexShrink={0}
      height={y ? theme.spacing[y] : undefined}
      width={x ? theme.spacing[x] : undefined}
      {...rest}
    />
  );
}
