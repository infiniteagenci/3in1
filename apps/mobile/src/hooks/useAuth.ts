import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '../api/client';
import { STORAGE_KEYS } from '../utils/constants';
import type { User } from '../types';

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    setAuth,
    clearAuth,
    updateUser,
    setLoading,
  } = useAuthStore();

  const login = useCallback(async (authCode: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post<{ user: User; session_token: string }>(
        '/auth/google/callback',
        { code: authCode }
      );

      await SecureStore.setItemAsync(STORAGE_KEYS.SESSION_TOKEN, response.session_token);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      setAuth(response.user, response.session_token);
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setAuth, setLoading]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.SESSION_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
      clearAuth();
    }
  }, [clearAuth]);

  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      const validUser = await apiClient.get<User>('/auth/validate');
      if (validUser) {
        setAuth(validUser, token || '');
        return true;
      }
      clearAuth();
      return false;
    } catch (error) {
      console.error('Session check error:', error);
      clearAuth();
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, setAuth, clearAuth, setLoading]);

  const updateUserAgeGroup = useCallback(
    async (ageGroup: string) => {
      try {
        await apiClient.post('/api/user/profile', { ageGroup });
        updateUser({ ageGroup: ageGroup as any });
      } catch (error) {
        console.error('Update age group error:', error);
      }
    },
    [updateUser]
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkSession,
    updateUserAgeGroup,
    updateUser,
  };
}
