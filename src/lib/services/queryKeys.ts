import type {MediaType} from '@/types';

/**
 * Query key factory for TanStack Query.
 * Centralizes all query keys to ensure consistency and enable
 * cache invalidation across the app.
 */
export const queryKeys = {
  movies: {
    all: ['movies'] as const,
    category: (category: string) => ['movies', 'category', category] as const,
    detail: (id: string) => ['movies', 'detail', id] as const,
    infinite: (category: string) =>
      ['movies', 'category', category, 'infinite'] as const,
  },
  tvShows: {
    all: ['tvShows'] as const,
    category: (category: string) => ['tvShows', 'category', category] as const,
    detail: (id: string) => ['tvShows', 'detail', id] as const,
    infinite: (category: string) =>
      ['tvShows', 'category', category, 'infinite'] as const,
  },
  trending: {
    all: ['trending'] as const,
    byType: (type: MediaType) => ['trending', type] as const,
  },
  search: {
    all: ['search'] as const,
    query: (q: string) => ['search', 'query', q] as const,
  },
} as const;
