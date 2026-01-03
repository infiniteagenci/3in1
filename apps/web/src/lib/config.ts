/**
 * Environment configuration utility
 * Centralizes all environment variable access with validation
 */

export interface AppConfig {
  baseUrl: string;
  apiUrl: string;
  googleOAuthClientId: string;
}

/**
 * Get the base API URL from environment variables
 * Defaults to localhost:8787 for development if not set
 */
function getApiUrl(): string {
  const apiUrl = import.meta.env.PUBLIC_BASE_API_URL;
  if (!apiUrl) {
    console.warn('PUBLIC_BASE_API_URL not set, defaulting to localhost');
    return 'http://localhost:8787';
  }
  return apiUrl;
}

/**
 * Get the base app URL from environment variables
 * Defaults to localhost:4321 for development if not set
 */
function getBaseUrl(): string {
  const baseUrl = import.meta.env.PUBLIC_BASE_APP_URL;
  if (!baseUrl) {
    console.warn('PUBLIC_BASE_APP_URL not set, defaulting to localhost');
    return 'http://localhost:4321';
  }
  return baseUrl;
}

/**
 * Get the Google OAuth Client ID from environment variables
 */
function getGoogleOAuthClientId(): string {
  const clientId = import.meta.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  if (!clientId) {
    throw new Error('PUBLIC_GOOGLE_OAUTH_CLIENT_ID is required but not set');
  }
  return clientId;
}

/**
 * Get all configuration values
 * Validates required environment variables are set
 */
export function getConfig(): AppConfig {
  return {
    baseUrl: getBaseUrl(),
    apiUrl: getApiUrl(),
    googleOAuthClientId: getGoogleOAuthClientId(),
  };
}

/**
 * Export individual getters for convenience
 */
export const apiUrl = getApiUrl();
export const baseUrl = getBaseUrl();
export const googleOAuthClientId = getGoogleOAuthClientId();
