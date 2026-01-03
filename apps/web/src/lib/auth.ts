/**
 * Authentication utility module
 * Handles session management, login, logout, and authentication state
 */

import { apiUrl } from './config';

export const SESSION_TOKEN_KEY = 'session_token';

export interface User {
  name: string;
  email: string;
  avatar_url?: string;
}

export interface SessionValidationResponse {
  user: User;
}

export interface AuthCallbackResponse {
  session_token?: string;
  error?: string;
}

export interface GoogleOAuthUrlResponse {
  url: string;
}

/**
 * Storage interface for session token management
 */
class SessionStorage {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SESSION_TOKEN_KEY);
  }

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  }

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_TOKEN_KEY);
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }
}

export const sessionStorage = new SessionStorage();

/**
 * Validate current session with the backend
 */
export async function validateSession(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${apiUrl}/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: SessionValidationResponse = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

/**
 * Get Google OAuth URL for login redirect
 */
export async function getGoogleOAuthUrl(): Promise<string> {
  const response = await fetch(`${apiUrl}/auth/google/url`);
  if (!response.ok) {
    throw new Error('Failed to get OAuth URL');
  }
  const data: GoogleOAuthUrlResponse = await response.json();
  return data.url;
}

/**
 * Exchange OAuth code for session token
 */
export async function exchangeCodeForToken(code: string): Promise<string | null> {
  try {
    const response = await fetch(`${apiUrl}/auth/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data: AuthCallbackResponse = await response.json();

    if (data.session_token) {
      return data.session_token;
    }

    return null;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return null;
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  const token = sessionStorage.getToken();

  if (token) {
    try {
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  sessionStorage.removeToken();
}

/**
 * Check if user has a valid session
 */
export async function hasValidSession(): Promise<boolean> {
  const token = sessionStorage.getToken();
  if (!token) return false;

  const user = await validateSession(token);
  return user !== null;
}

/**
 * Get current user info if session is valid
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = sessionStorage.getToken();
  if (!token) return null;

  return validateSession(token);
}

/**
 * Handle OAuth callback from URL
 */
export function getOAuthCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
}

/**
 * Clean URL by removing OAuth parameters
 */
export function cleanOAuthUrl(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.delete('code');
  url.searchParams.delete('state');
  window.history.replaceState({}, '', url.toString());
}
