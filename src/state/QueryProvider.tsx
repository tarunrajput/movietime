import React, {type ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ErrorBoundary} from '@/components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Provides TanStack Query client to the app with default configuration.
 * Wraps with ErrorBoundary for top-level error handling.
 */
export function QueryProvider({children}: QueryProviderProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
}
