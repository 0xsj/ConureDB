/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, useTheme, Stack, H4 } from 'tamagui';
import { SolitoImageProvider } from 'solito/image';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerNavigationOptions,
  DrawerHeaderProps
} from '@react-navigation/drawer';
import { Home } from './features/Home';
import config from '../tamagui';
import { UserDetailScreen } from './features/DetailScreen';
import { useFonts } from 'expo-font';
import { tamaguiFonts } from '../tamagui/tamaguiFonts.native';
import { Profile } from './features/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAtom } from 'jotai';
import { activeThemeAtom } from './state/theme';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Header = ({ route }: DrawerHeaderProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <DrawerToggleButton tintColor={theme.color?.val} />
      <Stack ai="center" jc={'space-between'} fd={'row'} f={1}>
        <H4 fontFamily={'$silkscreen'} pr={'$7'}>
          {route.name.toUpperCase()}
        </H4>
      </Stack>
    </SafeAreaView>
  );
};

const screenOptions: DrawerNavigationOptions = {
  header: props => <Header {...props} />
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
};

const TopTabNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="home" screenOptions={screenOptions}>
      <Drawer.Screen
        component={Home}
        key={'home'}
        name={'home'}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User'
        }}
      />
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Profile'
        }}
      />
    </Drawer.Navigator>
  );
};

const linking = {
  prefixes: ['', 'localhost'],
  config: {
    screens: {
      home: '',
      'user-detail': 'user/:id'
    }
  }
};

const InnerApp = () => {
  const colorScheme = useColorScheme() || 'light';
  const isDarkMode = colorScheme === 'dark';
  const theme = useTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          backgroundColor={theme.borderColor?.val}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer
          theme={isDarkMode ? DarkTheme : DefaultTheme}
          linking={linking}
        >
          {/* <TopTabNavigator /> */}
          <BottomTabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const App = () => {
  const theme = useColorScheme() || 'light';
  const [activeTheme] = useAtom(activeThemeAtom);
  const [loaded] = useFonts(tamaguiFonts);

  if (!loaded) {
    return null;
  }

  return (
    <SolitoImageProvider>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={activeTheme}
      >
        <InnerApp />
      </TamaguiProvider>
    </SolitoImageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    flex: 1
  },
  logoContainer: {
    flex: 1,
    height: 50,
    width: 50
  },
  routeName: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15
  }
});

export default App;
