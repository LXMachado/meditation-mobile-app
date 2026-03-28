import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '@/screens/HomeScreen';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { PlayerScreen } from '@/screens/PlayerScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SessionScreen } from '@/screens/SessionScreen';
import { useAppStore } from '@/store/useAppStore';
import { theme } from '@/theme/theme';
import type { RootStackParamList, TabParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const themeMode = useAppStore((state) => state.themeMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: theme.typography.label,
          fontSize: 11,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
        },
        tabBarBackground: () => (
          <BlurView intensity={28} style={{ flex: 1, borderTopLeftRadius: 28, borderTopRightRadius: 28 }} />
        ),
        tabBarStyle: {
          backgroundColor:
            themeMode === 'dark' ? 'rgba(31, 35, 68, 0.55)' : 'rgba(255,255,255,0.75)',
          borderTopWidth: 0,
          height: 86,
          paddingBottom: 12,
          paddingTop: 8,
          position: 'absolute',
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            color={color}
            name={getTabIcon(route.name, focused)}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Player" component={PlayerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const themeMode = useAppStore((state) => state.themeMode);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: themeMode === 'dark' ? theme.colors.surface : '#F3F4FF',
          card: themeMode === 'dark' ? theme.colors.surface : '#FFFFFF',
          text: themeMode === 'dark' ? theme.colors.text : '#11162C',
          primary: theme.colors.primary,
          border: 'transparent',
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen
          name="Session"
          component={SessionScreen}
          options={{ animation: 'fade_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function getTabIcon(routeName: keyof TabParamList, focused: boolean): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'Explore':
      return focused ? 'compass' : 'compass-outline';
    case 'Player':
      return focused ? 'play-circle' : 'play-circle-outline';
    case 'Profile':
      return focused ? 'person' : 'person-outline';
    default:
      return 'ellipse-outline';
  }
}
