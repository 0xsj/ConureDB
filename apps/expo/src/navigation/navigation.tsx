import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeScreen } from "../screens/home";
import { SettingsScreen } from "../screens/settings";
import { TodoDetailsScreen } from "../screens/todo-detail";
import { AnalyticsScreen } from "../screens/analytics";
import { ProfileScreen } from "../screens/profile";

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
      <AppStack.Screen name="settings" component={SettingsScreen} />
      <AppStack.Screen name="analytics" component={AnalyticsScreen} />
      <AppStack.Screen name="profile" component={ProfileScreen} />
      <AppStack.Group screenOptions={navOptions.presentationModal}>
        <AppStack.Screen name="todoDetail" component={TodoDetailsScreen} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
}

const navOptions = {
  noHeader: { headerShown: false },
  presentationModal: { presentation: "modal" },
} as const;
