export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  backoff: boolean = true
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const waitTime = backoff ? delay * Math.pow(2, i) : delay;
      await sleep(waitTime);
    }
  }
  throw new Error('Max retries exceeded');
}

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Promise timeout')), ms)
    ),
  ]);
}

export async function waitFor(
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await sleep(interval);
  }
}

export function debouncePromise<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  delay: number
): (...args: T) => Promise<R> {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastPromise: Promise<R> | null = null;

  return (...args: T): Promise<R> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise<R>((resolve, reject) => {
      timeoutId = setTimeout(() => {
        lastPromise = fn(...args).then(resolve, reject);
      }, delay);
    });
  };
}

export function throttlePromise<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  interval: number
): (...args: T) => Promise<R> {
  let lastCall = 0;
  let promise: Promise<R> | null = null;

  return (...args: T): Promise<R> => {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      return (promise = fn(...args));
    }
    return promise || Promise.reject(new Error('Throttled'));
  };
}
