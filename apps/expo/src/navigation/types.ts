import { Screens } from "./screens";
import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  [Screens.Home]: undefined;
};

export type AddNoteStackParamList = {
  [Screens.Note]: undefined;
};

export type AppStackParamList = {
  home: NavigatorScreenParams<HomeStackParamList>;
  note: NavigatorScreenParams<AddNoteStackParamList>;
};

export type AppStackScreenProp<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;
