import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { TabNavigator } from './TabNavigator';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { useAuth } from '../hooks/useAuth';
import { Colors } from '../utils/theme';

const Stack = createStackNavigator();

export function RootNavigator() {
  const { isAuthenticated, isLoading, checkSession } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkSession().then(() => setIsChecking(false));
  }, []);

  if (isLoading || isChecking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
