export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface RequestConfig {
  skipErrorHandler?: boolean;
  retryCount?: number;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ResponseInterceptor<T = any> {
  onSuccess?(data: T): T;
  onError?(error: Error): Promise<never>;
}
