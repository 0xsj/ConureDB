/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, useTheme, Stack, H4, Button } from 'tamagui';
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
import config from '../tamagui';
import { UserDetailScreen } from './features/DetailScreen';
import { useFonts } from 'expo-font';
import { tamaguiFonts } from '../tamagui/tamaguiFonts.native';
import { Profile, Home, Messages, Notifications } from './features';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useThemeToggle, themeAtom } from './state/theme';
import {
  Search,
  Plus,
  Settings,
  Bell,
  MessageCircle
} from '@tamagui/lucide-icons';
import { CustomTabBar } from './components/custom-tab';
import { StickyHeader } from './components/molecules';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const routes = [
  {
    key: 'home',
    name: 'Home',
    component: Home,
    icon: Search
  },
  {
    key: 'messages',
    name: 'Messages',
    component: Messages,
    icon: MessageCircle
  },

  {
    key: 'Add',
    name: 'Add',
    component: Profile,
    icon: Plus
  },

  {
    key: 'notifications',
    name: 'Notifications',
    component: Notifications,
    icon: Bell
  },
  {
    key: 'profile',
    name: 'Profile',
    component: Profile,
    icon: Settings
  }
];

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
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      {routes.map(route => (
        <Tab.Screen
          key={route.key}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false
          }}
        />
      ))}
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
  const { theme } = useThemeToggle();
  const isDarkMode = theme === 'dark';
  console.log('APP.tsx: ', theme);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer
          theme={isDarkMode ? DarkTheme : DefaultTheme}
          linking={linking}
        >
          {/* <TopTabNavigator /> */}
          <StickyHeader />
          <BottomTabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const App = () => {
  const { theme } = useThemeToggle();
  const [loaded] = useFonts(tamaguiFonts);

  if (!loaded) {
    return null;
  }

  return (
    <SolitoImageProvider>
      <TamaguiProvider config={config} disableInjectCSS defaultTheme={theme}>
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
