import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeScreen } from "../screens/home";

export type RootStackParamList = {
  home: undefined;
  settings: undefined;
  todoDetail: undefined;
  analytics: undefined;
  profile: undefined;
};

const AppStack = createStackNavigator<RootStackParamList>();
const SettingsStack = createStackNavigator();

function SettingsStackGroup(): JSX.Element {
  return (
    <SettingsStack.Navigator>
      {/* <SettingsStack.Screen/> */}
    </SettingsStack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={navOptions.noHeader}>
      <AppStack.Screen name="home" component={HomeScreen} />
    </AppStack.Navigator>
  );
}

const navOptions = {
  noHeader: { headerShown: false },
  presentationModal: { presentation: "modal" },
} as const;
