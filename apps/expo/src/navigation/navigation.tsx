import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";

export type RootStackParamList = {
  home: undefined;
};

const AppStack = createStackNavigator<RootStackParamList>();

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
