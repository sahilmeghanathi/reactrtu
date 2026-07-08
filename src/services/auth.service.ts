import { apiService } from './api.service';
import { API_ENDPOINTS } from '@/api/endpoints';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY } from '@/config/env';
import { AuthCredentials, AuthResponse, User } from '@/types/api';

class AuthService {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );

    this.saveAuthData(response);
    return response;
  }

  async signup(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.auth.signup,
      data
    );

    this.saveAuthData(response);
    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.auth.logout);
    } finally {
      this.clearAuthData();
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<{ accessToken: string }>(
      API_ENDPOINTS.auth.refresh,
      { refreshToken }
    );

    localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken);
    return response.accessToken;
  }

  async verifyToken(token: string): Promise<User> {
    return apiService.get<User>(API_ENDPOINTS.auth.verify, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiService.post(API_ENDPOINTS.auth.forgotPassword, { email });
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return apiService.post(API_ENDPOINTS.auth.resetPassword, {
      token,
      password,
    });
  }

  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  getStoredUser(): User | null {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }

  isTokenValid(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private saveAuthData(response: AuthResponse): void {
    localStorage.setItem(AUTH_TOKEN_KEY, response.token.accessToken);
    if (response.token.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, response.token.refreshToken);
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
  }

  private clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }
}

export const authService = new AuthService();
