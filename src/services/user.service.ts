import { apiService } from './api.service';
import { API_ENDPOINTS } from '@/api/endpoints';
import { User, PaginatedResponse } from '@/types/api';
import { UserProfile, PaginationParams, ListResponse } from '@/types/entities';

class UserService {
  async getProfile(): Promise<UserProfile> {
    return apiService.get<UserProfile>(API_ENDPOINTS.users.profile);
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiService.put<UserProfile>(API_ENDPOINTS.users.updateProfile, data);
  }

  async getUser(id: string): Promise<User> {
    return apiService.get<User>(API_ENDPOINTS.users.get(id));
  }

  async listUsers(params?: Partial<PaginationParams>): Promise<ListResponse<User>> {
    return apiService.get<ListResponse<User>>(API_ENDPOINTS.users.list, {
      params,
    });
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return apiService.post<User>(API_ENDPOINTS.users.create, data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return apiService.put<User>(API_ENDPOINTS.users.update(id), data);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    return apiService.delete(API_ENDPOINTS.users.delete(id));
  }

  async searchUsers(query: string): Promise<User[]> {
    return apiService.get<User[]>(API_ENDPOINTS.users.list, {
      params: { search: query },
    });
  }
}

export const userService = new UserService();
