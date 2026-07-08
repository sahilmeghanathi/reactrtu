export const APP_CONFIG = {
  name: 'ReactRTU',
  version: '1.0.0',
  supportEmail: 'support@reactrtu.com',
  companyName: 'ReactRTU Inc.',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

export const TIMEOUTS = {
  SHORT: 2000,
  NORMAL: 5000,
  LONG: 10000,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest',
} as const;

export const NOTIFICATION_MESSAGES = {
  success: {
    login: 'Successfully logged in!',
    logout: 'Successfully logged out!',
    create: 'Created successfully!',
    update: 'Updated successfully!',
    delete: 'Deleted successfully!',
  },
  error: {
    login: 'Failed to login. Please check your credentials.',
    logout: 'Failed to logout.',
    create: 'Failed to create. Please try again.',
    update: 'Failed to update. Please try again.',
    delete: 'Failed to delete. Please try again.',
    network: 'Network error. Please check your connection.',
    unknown: 'An unexpected error occurred.',
  },
} as const;

export const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export const LOCAL_STORAGE_KEYS = {
  auth_token: 'auth_token',
  refresh_token: 'refresh_token',
  user_data: 'user_data',
  theme: 'theme',
  language: 'language',
  sidebar_state: 'sidebar_state',
} as const;

export const QUERY_KEYS = {
  auth: ['auth'] as const,
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  dashboard: ['dashboard'] as const,
  profile: ['profile'] as const,
} as const;
