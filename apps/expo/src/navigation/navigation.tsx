import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";
import { NoteScreen } from "../screens/note";

export type RootStackParamList = {
  home: undefined;
  note: undefined;
};

const AppStack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={navOptions.noHeader}>
      <AppStack.Screen name="home" component={HomeScreen} />
      <AppStack.Screen name="note" component={NoteScreen} />
    </AppStack.Navigator>
  );
}

const navOptions = {
  noHeader: { headerShown: false },
  presentationModal: { presentation: "modal" },
} as const;
