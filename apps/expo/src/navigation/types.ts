import { Screens } from "./screens";
import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  [Screens.Home]: undefined;
};

export type AppStackParamList = {
  home: NavigatorScreenParams<HomeStackParamList>;
};

export type AppStackScreenProp<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;
