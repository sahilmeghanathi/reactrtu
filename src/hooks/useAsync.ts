import React, { useState, useCallback } from 'react';
import { AsyncState, RequestState } from '@/types/api';

export function useAsync<T = any>(
  asyncFunction: () => Promise<T>,
  immediate = true
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    state: 'idle',
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const execute = useCallback(async () => {
    setState({ state: 'loading', isLoading: true, isError: false, isSuccess: false });
    try {
      const response = await asyncFunction();
      setState({
        state: 'success',
        data: response,
        isLoading: false,
        isError: false,
        isSuccess: true,
      });
    } catch (error) {
      setState({
        state: 'error',
        error: error instanceof Error ? error : new Error(String(error)),
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
    }
  }, [asyncFunction]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}