interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENV: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ReactRTU';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const ENVIRONMENT = (import.meta.env.VITE_ENV || 'development') as 'development' | 'staging' | 'production';

export const isDevelopment = ENVIRONMENT === 'development';
export const isStaging = ENVIRONMENT === 'staging';
export const isProduction = ENVIRONMENT === 'production';

export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_DATA_KEY = 'user_data';

export const config = {
  api: {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
  },
  app: {
    name: APP_NAME,
    version: APP_VERSION,
  },
  env: ENVIRONMENT,
  debug: isDevelopment,
} as const;
