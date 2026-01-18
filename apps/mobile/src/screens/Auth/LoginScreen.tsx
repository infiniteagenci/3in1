import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../utils/constants';
import { Colors, Spacing, Typography } from '../../utils/theme';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);

      const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: undefined,
        path: 'oauth2callback',
      });

      // Open Google OAuth in browser
      const authUrl = `${API_BASE_URL}/auth/google/url`;
      const result = await WebBrowser.openAuthSessionAsync(
        `${authUrl}?redirect_uri=${encodeURIComponent(redirectUri)}`,
        redirectUri
      );

      if (result.type === 'success' && result.url) {
        // Extract the auth code from the callback URL
        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        if (code) {
          await login(code);
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>3in1</Text>
        </View>
        <Text style={styles.tagline}>Spiritual guidance for your journey</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subtitleText}>
          Connect with God through Scripture, prayer, and Catholic teaching
        </Text>

        <Button
          title="Continue with Google"
          onPress={handleGoogleSignIn}
          loading={isLoading || isSigningIn}
          full
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl * 2,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gradientPrimary[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logoText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: '#fff',
  },
  tagline: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  welcomeText: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
});
