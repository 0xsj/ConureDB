import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";
import { AddNoteScreen } from "../screens/add-note";

export type RootStackParamList = {
  home: undefined;
  addNote: undefined;
};

const AppStack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={navOptions.noHeader}>
      <AppStack.Screen name="home" component={HomeScreen} />
      <AppStack.Screen name="addNote" component={AddNoteScreen} />
    </AppStack.Navigator>
  );
}

const navOptions = {
  noHeader: { headerShown: false },
  presentationModal: { presentation: "modal" },
} as const;
