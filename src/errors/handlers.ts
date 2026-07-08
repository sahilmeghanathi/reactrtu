import { AxiosError } from 'axios';
import {
  AppError,
  ApiError,
  NetworkError,
  ValidationError,
  AuthError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from './AppError';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as Record<string, any>;
    return data?.message || data?.error || error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

export function getErrorCode(error: unknown): string {
  if (error instanceof AppError) {
    return error.code;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as Record<string, any>;
    return data?.code || 'UNKNOWN_ERROR';
  }

  return 'UNKNOWN_ERROR';
}

export function transformAxiosError(error: AxiosError): ApiError {
  const status = error.response?.status || 500;
  const data = error.response?.data as Record<string, any>;
  const message = data?.message || error.message || 'API request failed';
  const code = data?.code || `HTTP_${status}`;

  if (status === 401) {
    return new UnauthorizedError(message);
  }

  if (status === 403) {
    return new ForbiddenError(message);
  }

  if (status === 404) {
    return new NotFoundError(message);
  }

  if (status === 409) {
    return new ConflictError(message);
  }

  if (status === 422 || status === 400) {
    return new ValidationError(message);
  }

  if (status === 0) {
    return new NetworkError(message);
  }

  return new ApiError(message, status, code, data?.details);
}

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function formatStackTrace(error: unknown, limit: number = 10): string[] {
  if (!(error instanceof Error) || !error.stack) {
    return [];
  }

  return error.stack
    .split('\n')
    .slice(1, limit + 1)
    .map((line) => line.trim());
}

export function logError(error: unknown, context?: string): void {
  const message = getErrorMessage(error);
  const code = getErrorCode(error);

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${code}]${context ? ` ${context}:` : ''} ${message}`, error);
  } else {
    console.error(`Error: ${message}`);
  }
}

export function createErrorResponse(error: unknown) {
  const message = getErrorMessage(error);
  const code = getErrorCode(error);
  const statusCode = isAppError(error) ? error.statusCode : 500;

  return {
    success: false,
    message,
    code,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
