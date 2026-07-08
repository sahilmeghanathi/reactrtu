export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  details?: Record<string, unknown>;
}

export interface ApiRequest<T = any> {
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export type RequestState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  state: RequestState;
  data?: T;
  error?: Error;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: AuthToken;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn?: number;
}
