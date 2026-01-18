import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatScreen } from '../screens/Chat/ChatScreen';
import { LibraryScreen } from '../screens/Library/LibraryScreen';
import { PrayersScreen } from '../screens/Prayers/PrayersScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { Colors, Spacing } from '../utils/theme';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.sm,
          height: 60,
          backgroundColor: Colors.card,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => <TabIcon icon="💬" color={color} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => <TabIcon icon="✝️" color={color} />,
        }}
      />
      <Tab.Screen
        name="Prayers"
        component={PrayersScreen}
        options={{
          tabBarLabel: 'Prayers',
          tabBarIcon: ({ color }) => <TabIcon icon="🙏" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 22 }}>{icon}</Text>;
}

function Text({ style, children }: { style?: any; children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
