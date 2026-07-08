export function setStorageItem<T>(key: string, value: T, expirationMs?: number): void {
  try {
    const item = {
      value,
      expiresAt: expirationMs ? Date.now() + expirationMs : null,
    };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(item));
    }
  } catch (error) {
    console.error(`Failed to set localStorage item ${key}:`, error);
  }
}

export function getStorageItem<T>(key: string, defaultValue?: T): T | null {
  try {
    if (typeof window === 'undefined') return defaultValue ?? null;

    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue ?? null;

    const parsed = JSON.parse(item);
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(key);
      return defaultValue ?? null;
    }

    return parsed.value as T;
  } catch (error) {
    console.error(`Failed to get localStorage item ${key}:`, error);
    return defaultValue ?? null;
  }
}

export function removeStorageItem(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Failed to remove localStorage item ${key}:`, error);
  }
}

export function clearStorage(): void {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

export function setSessionItem<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Failed to set sessionStorage item ${key}:`, error);
  }
}

export function getSessionItem<T>(key: string, defaultValue?: T): T | null {
  try {
    if (typeof window === 'undefined') return defaultValue ?? null;

    const item = window.sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue ?? null;
  } catch (error) {
    console.error(`Failed to get sessionStorage item ${key}:`, error);
    return defaultValue ?? null;
  }
}

export function removeSessionItem(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Failed to remove sessionStorage item ${key}:`, error);
  }
}

export function clearSession(): void {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error);
  }
}
