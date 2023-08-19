import { Screens } from "./screens";
import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SettingsStackParamList = {
  [Screens.Settings]: undefined;
};

export type HomeStackParamList = {
  [Screens.Home]: undefined;
};

export type TodoDetailsStackParamList = {
  [Screens.TodoDetails]: { todoId: string };
};

export type AnalyticsStackParamList = {
  [Screens.Analytics]: undefined;
};

export type ProfileStackParamList = {
  [Screens.Profile]: undefined;
};

export type AppStackParamList = {
  home: NavigatorScreenParams<HomeStackParamList>;
  settings: NavigatorScreenParams<SettingsStackParamList>;
  todoDetails: NavigatorScreenParams<TodoDetailsStackParamList>;
  analytics: NavigatorScreenParams<AnalyticsStackParamList>;
  profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type AppStackScreenProp<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;
