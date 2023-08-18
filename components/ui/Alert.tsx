import React, { useCallback } from "react";
import { Text } from "react-native";

import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

export type AlertVariants = "default" | "destructive";

export interface IAlertProps {
  variant?: AlertVariants;
  title?: string;
  message?: string;
  duration?: number;
}

export const Alert = React.forwardRef(({}, ref) => {
  const translateY = useSharedValue<number>(-100);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [variant, setVariant] = React.useState<AlertVariants>("default");
  const [title, setTitle] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [duration, setDuration] = React.useState<number>(3000);

  const showAlert = useCallback(
    ({ variant, title, message, duration }: IAlertProps) => {
      setVariant(variant ? variant : "default");
      setTitle(title ? title : "");
      setMessage(message ? message : "");
      setDuration(duration ? duration : 3000);
      setIsShown(true);
      translateY.value = withSequence(
        withTiming(60),
        withDelay(
          duration ? duration : 3000,
          withTiming(-100, undefined, (finish) => {
            if (finish) {
              runOnJS(setIsShown)(false);
            }
          })
        )
      );
    },
    [translateY]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      showAlert,
    }),
    [showAlert]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: translateY.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY < 100) {
        translateY.value = withSpring(ctx.startY + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    },
    onEnd: (event) => {
      if (event.translationY < 0) {
        translateY.value = withTiming(-100, undefined, (finish) => {
          if (finish) {
            runOnJS(setIsShown)(false);
          }
        });
      } else if (event.translationY > 0) {
        translateY.value = withSequence(
          withTiming(60),
          withDelay(
            duration,
            withTiming(-100, undefined, (finish) => {
              if (finish) {
                runOnJS(setIsShown)(false);
              }
            })
          )
        );
      }
    },
  });

  return (
    <>
      {isShown && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {
                position: "absolute",
                width: "100%",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "gray",
                padding: 16,
                zIndex: 10,
                backgroundColor: "white",
              },
              variant === "destructive" && {
                borderColor: "red",
                backgroundColor: "white",
              },
              animatedStyle,
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 16,
                  fontWeight: "500",
                  marginBottom: 4,
                },
                variant === "destructive" && {
                  color: "red",
                },
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                {
                  fontSize: 14,
                },
                variant === "destructive" && {
                  color: "red",
                },
              ]}
            >
              {message}
            </Text>
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  );
});
