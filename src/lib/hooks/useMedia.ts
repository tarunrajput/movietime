import {useInfiniteQuery, useQueries, useQuery} from '@tanstack/react-query';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {
  fetchMediaByCategory,
  fetchTrending,
  fetchMovieDetail,
  fetchTVShowDetail,
  searchMulti,
} from '@/lib/services/tmdb';
import {queryKeys} from '@/lib/services/queryKeys';
import MovieTypes from '@/lib/constants/MovieTypes';
import TVShowsTypes from '@/lib/constants/TVShowsTypes';
import type {
  MediaType,
  MovieDetail,
  TVShowDetail,
  SearchMovie,
  SearchTVShow,
  SearchPerson,
} from '@/types';

const STALE_TIME = 5 * 60 * 1000;
const GC_TIME = 30 * 60 * 1000;

// ─── Category lists ──────────────────────────────────────────────────────────
// Single source of truth for both the Home rows (labels + icons) and the
// queries behind them, so a row can never be fed another category's data.

const CATEGORIES: Record<MediaType, typeof MovieTypes> = {
  movie: MovieTypes,
  tv: TVShowsTypes,
};

export function getCategories(type: MediaType) {
  return CATEGORIES[type];
}

function categoryKey(type: MediaType, category: string) {
  return type === 'movie'
    ? queryKeys.movies.category(category)
    : queryKeys.tvShows.category(category);
}

function categoryInfiniteKey(type: MediaType, category: string) {
  return type === 'movie'
    ? queryKeys.movies.infinite(category)
    : queryKeys.tvShows.infinite(category);
}

// ─── Home ────────────────────────────────────────────────────────────────────

/** Fetches page 1 of every category for the given media type. */
export function useAllCategories(type: MediaType) {
  const queries = useQueries({
    queries: CATEGORIES[type].map(category => ({
      queryKey: categoryKey(type, category.label),
      queryFn: () => fetchMediaByCategory(type, category.label, 1),
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
    })),
  });

  return {
    // Aligned by index with CATEGORIES[type]
    data: queries.every(q => q.data !== undefined)
      ? queries.map(q => q.data!)
      : undefined,
    isLoading: queries.some(q => q.isLoading),
    isError: queries.some(q => q.isError),
    errors: queries.flatMap(q => (q.error ? [q.error] : [])),
  };
}

export function useTrending(type: MediaType) {
  return useQuery({
    queryKey: queryKeys.trending.byType(type),
    queryFn: () => fetchTrending(type),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

// ─── List screen ─────────────────────────────────────────────────────────────

/** Infinite scroll through one category, used by the "More" list screen. */
export function useCategoryInfinite(type: MediaType, category: string) {
  return useInfiniteQuery({
    queryKey: categoryInfiniteKey(type, category),
    queryFn: ({pageParam}) => fetchMediaByCategory(type, category, pageParam),
    initialPageParam: 1,
    getNextPageParam: last =>
      last.page < last.total_pages ? last.page + 1 : undefined,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: !!category,
  });
}

// ─── Detail ──────────────────────────────────────────────────────────────────

export function useMediaDetail(id: string, type: MediaType) {
  const isMovie = type === 'movie';

  return useQuery<MovieDetail | TVShowDetail>({
    queryKey: isMovie
      ? queryKeys.movies.detail(id)
      : queryKeys.tvShows.detail(id),
    queryFn: () => (isMovie ? fetchMovieDetail(id) : fetchTVShowDetail(id)),
    staleTime: 10 * 60 * 1000, // detail data changes less often
    gcTime: 60 * 60 * 1000,
    enabled: !!id,
  });
}

// ─── Search ──────────────────────────────────────────────────────────────────

export interface GroupedResults {
  movies: SearchMovie[];
  tvShows: SearchTVShow[];
  people: SearchPerson[];
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search input by 300ms to avoid hitting TMDB rate limits
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchResult = useQuery({
    queryKey: queryKeys.search.query(debouncedQuery),
    queryFn: () => searchMulti(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Group results by media_type for sectioned display
  const groupedResults: GroupedResults = useMemo(() => {
    const results = searchResult.data?.results ?? [];
    return results.reduce(
      (acc, item) => {
        if (item.media_type === 'movie') {
          acc.movies.push(item);
        } else if (item.media_type === 'tv') {
          acc.tvShows.push(item);
        } else if (item.media_type === 'person') {
          acc.people.push(item);
        }
        return acc;
      },
      {movies: [], tvShows: [], people: []} as GroupedResults,
    );
  }, [searchResult.data]);

  const handleQueryChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    clearQuery,
    debouncedQuery,
    groupedResults,
    isSearching:
      (searchResult.isLoading || searchResult.isFetching) &&
      debouncedQuery.length >= 2,
    hasSearched: debouncedQuery.length >= 2,
    ...searchResult,
  };
}
