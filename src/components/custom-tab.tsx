import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  Search,
  Plus,
  Settings,
  Bell,
  MessageCircle
} from '@tamagui/lucide-icons';
import { XStack } from 'tamagui';
import { AddSheet } from './organisms';

interface CustomTabBarProps {
  state?: any;
  descriptors?: any;
  navigation?: any;
}

const iconMap = {
  Home: Search,
  Add: Plus,
  Profile: Settings,
  Messages: MessageCircle,
  Notifications: Bell
};

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const { routes } = state;

  return (
    <XStack backgroundColor={'$background'}>
      {routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabButton}
              onPress={() => navigation.navigate(route.name)}
            >
              <AddSheet />
              <Text
                style={{
                  color: isFocused ? '#007AFF' : 'grey',
                  display: 'none'
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }

        //@ts-ignore
        const IconComponent = iconMap[route.name];
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
          >
            <IconComponent size={24} color={isFocused ? '#007AFF' : 'grey'} />
            <Text
              style={{ color: isFocused ? '#007AFF' : 'grey', display: 'none' }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </XStack>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#ccc'
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  labelContainer: {
    height: 0
  }
});
