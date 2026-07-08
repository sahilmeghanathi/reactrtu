import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY } from '@/config/env';
import { transformAxiosError } from '@/errors/handlers';
import { UnauthorizedError, NetworkError } from '@/errors/AppError';

export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  skipErrorHandler?: boolean;
  retryCount?: number;
}

let refreshTokenPromise: Promise<string> | null = null;

export function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config: CustomRequestConfig) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.retryCount = 0;
      return config;
    },
    (error) => {
      return Promise.reject(new NetworkError('Request configuration failed'));
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const config = error.config as CustomRequestConfig | undefined;

      if (!error.response) {
        return Promise.reject(new NetworkError('Network request failed'));
      }

      if (error.response.status === 401 && config && !config.skipErrorHandler) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshAccessToken()
            .then((newToken) => {
              localStorage.setItem(AUTH_TOKEN_KEY, newToken);
              refreshTokenPromise = null;
              return newToken;
            })
            .catch((err) => {
              refreshTokenPromise = null;
              localStorage.removeItem(AUTH_TOKEN_KEY);
              window.location.href = '/login';
              return Promise.reject(err);
            });
        }

        return refreshTokenPromise.then((token) => {
          const newConfig = { ...config };
          newConfig.headers.Authorization = `Bearer ${token}`;
          return client(newConfig);
        });
      }

      return Promise.reject(transformAxiosError(error));
    }
  );

  return client;
}

async function refreshAccessToken(): Promise<string> {
  const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data.accessToken || response.data.token;
}

export const apiClient = createApiClient();
