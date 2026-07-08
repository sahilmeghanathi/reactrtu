import { User } from './api';

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

export interface UserProfile extends User {
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  phone?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  preferences?: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: boolean;
  };
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  growthRate: number;
  topCountries?: string[];
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  requiredRole?: UserRole[];
}

export interface NotificationPayload {
  id?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
