import { useState, useCallback } from 'react';

interface ApiHookState<T> {
  data?: T;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: any;
}

export function useLazyApi<T>(apiCall: (...args: any[]) => Promise<T>) {
  const [state, setState] = useState<ApiHookState<T>>({
    data: undefined,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: undefined,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      if (!apiCall) {
        throw new Error('apiCall is not defined');
      } else {
        console.log('API method is valid:', apiCall);
      }

      setState({ data: undefined, isPending: true, isSuccess: false, isError: false, error: undefined });
      try {
        const data = await apiCall(...args);
        setState({ data, isPending: false, isSuccess: true, isError: false, error: undefined });
        return data;
      } catch (error) {
        console.error('API call failed:', error);
        setState({ data: undefined, isPending: false, isSuccess: false, isError: true, error });
        throw error;
      }
    },
    [apiCall],
  );

  return { ...state, execute };
}
