import { apiClient } from '@/api/client';
import { ApiResponse, ApiErrorResponse } from '@/types/api';
import { getErrorMessage } from '@/errors/handlers';

export class ApiService {
  async get<T = any>(url: string, config?: any): Promise<T> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url, config);
      return response.data.data as T;
    } catch (error) {
      throw error;
    }
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data, config);
      return response.data.data as T;
    } catch (error) {
      throw error;
    }
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data, config);
      return response.data.data as T;
    } catch (error) {
      throw error;
    }
  }

  async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
      return response.data.data as T;
    } catch (error) {
      throw error;
    }
  }

  async delete<T = any>(url: string, config?: any): Promise<T> {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url, config);
      return response.data.data as T;
    } catch (error) {
      throw error;
    }
  }

  handleError(error: unknown): string {
    return getErrorMessage(error);
  }
}

export const apiService = new ApiService();
