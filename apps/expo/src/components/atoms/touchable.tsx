import { Pressable, PressableProps } from "./pressable";
import {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  BorderProps,
  OpacityProps,
  backgroundColor,
  backgroundColorShorthand,
  border,
  opacity,
  composeRestyleFunctions,
  ResponsiveValue,
  useRestyle,
  useTheme,
  useResponsiveProp,
} from "@shopify/restyle";
import { Theme } from "../../theme";
import { ViewStyle } from "react-native";
import { Platform } from "react-native";

type RestyleProps = BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BorderProps<Theme> &
  OpacityProps<Theme> & {
    style?: ViewStyle;
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  backgroundColorShorthand,
  backgroundColor,
  border,
  opacity,
]);

// ripple color's second should be type Theme, but does not take
interface StyledPressableProps extends PressableProps {
  pressed?: RestyleProps;
  rippleColor?: ResponsiveValue<keyof Theme["colors"], any>;
  rippleBorderless?: boolean;
}

const Touchable = ({
  pressed,
  rippleColor,
  rippleBorderless,
  style,
  ...rest
}: StyledPressableProps) => {
  const { style: pressedStyle } = pressed
    ? useRestyle(restyleFunctions, pressed)
    : { style: undefined };
  const theme = useTheme<Theme>();
  const rippleColorProp = rippleColor && useResponsiveProp(rippleColor);
  const rippleColorValue = rippleColorProp && theme.colors[rippleColorProp];

  return (
    <Pressable
      {...rest}
      android_ripple={{ color: rippleColorValue, borderless: rippleBorderless }}
      // @ts-ignore
      style={({ pressed: isPressed }) =>
        isPressed ? [style, pressedStyle] : style
      }
    />
  );
};

export const TouchableOpacity: React.FC<StyledPressableProps> = (props) => (
  <Touchable
    rippleColor="black"
    {...props}
    pressed={{ opacity: Platform.select({ ios: 0.6 }) }}
  />
);

export default Touchable;
