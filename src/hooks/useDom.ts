import { useEffect, useRef, useCallback, useState } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    mediaQueryRef.current = window.matchMedia(query);
    setMatches(mediaQueryRef.current.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryRef.current.addEventListener('change', handleChange);

    return () => {
      mediaQueryRef.current?.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
