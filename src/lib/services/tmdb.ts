import {APIHOST, IMAGE_URL, defaultQueryOptions} from '@/lib/config/apiConfig';
import type {
  TMDBPaginatedResponse,
  Movie,
  TVShow,
  MovieDetail,
  TVShowDetail,
  SearchResult,
  SearchMovie,
  SearchTVShow,
  Video,
} from '@/types';
import type {MediaType} from '@/types';

/**
 * Nitro Fetch: native Cronet/URLSession-powered drop-in replacement for `fetch`.
 *
 * The nitro JS chain evaluates `NitroModules.createHybridObject(...)` at module
 * scope, which throws a fatal ModuleNotFoundError wherever the native runtime
 * is absent (Expo Go, jest, dev clients built before the nitro packages were
 * linked). So probe for the runtime's own presence marker first — it is set by
 * the native install() before any hybrid object can be created — and only
 * require the JS package when it exists. Only the decision is cached;
 * globalThis.fetch is read per call so late replacements are honored.
 */
let nitroFetchImpl: typeof globalThis.fetch | undefined;
let nitroProbeDone = false;

function resolveFetch(): typeof globalThis.fetch {
  if (!nitroProbeDone) {
    nitroProbeDone = true;
    try {
      const hasNitroRuntime =
        (globalThis as Record<string, unknown>).NitroModulesProxy != null;
      if (hasNitroRuntime) {
        nitroFetchImpl = require('react-native-nitro-fetch')
          .fetch as typeof globalThis.fetch;
      }
    } catch {
      nitroFetchImpl = undefined;
    }
  }
  return nitroFetchImpl ?? globalThis.fetch;
}

/** Base fetch wrapper for TMDB API. Auth via EXPO_PUBLIC_TMDB_API_KEY (see apiConfig). */
async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const searchParams = new URLSearchParams({...defaultQueryOptions, ...params});
  const url = `${APIHOST}${endpoint}?${searchParams.toString()}`;

  const response = await resolveFetch()(url);

  if (!response.ok) {
    throw new TMDBError(
      `TMDB request failed: ${response.status} ${response.statusText}`,
      response.status,
      endpoint,
    );
  }

  return response.json() as Promise<T>;
}

export class TMDBError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
  ) {
    super(message);
    this.name = 'TMDBError';
  }
}

// ─── Categories ──────────────────────────────────────────────────────────────
// Labels must stay in sync with the TabConfig lists in lib/constants, which
// render the Home rows backed by these endpoints.

const CATEGORY_ENDPOINTS: Record<MediaType, Record<string, string>> = {
  movie: {
    Popular: '/movie/popular',
    'Top Rated': '/movie/top_rated',
    'Now Playing': '/movie/now_playing',
    Upcoming: '/movie/upcoming',
  },
  tv: {
    Popular: '/tv/popular',
    'Top Rated': '/tv/top_rated',
    'Airing Today': '/tv/airing_today',
    'On The Air': '/tv/on_the_air',
  },
};

/**
 * Category list endpoints do not include media_type; tag each row here so
 * everything downstream can treat items as SearchResult-shaped.
 */
export async function fetchMediaByCategory(
  type: MediaType,
  category: string,
  page = 1,
): Promise<TMDBPaginatedResponse<SearchMovie | SearchTVShow>> {
  const endpoint = CATEGORY_ENDPOINTS[type][category];
  if (!endpoint) {
    throw new Error(`Unknown ${type} category: ${category}`);
  }

  const data = await tmdbFetch<TMDBPaginatedResponse<Movie | TVShow>>(
    endpoint,
    {
      page: String(page),
    },
  );
  return {
    ...data,
    results: data.results.map(
      item => ({...item, media_type: type}) as SearchMovie | SearchTVShow,
    ),
  };
}

// ─── Trending ────────────────────────────────────────────────────────────────

export function fetchTrending(mediaType: 'movie' | 'tv') {
  return tmdbFetch<TMDBPaginatedResponse<Movie | TVShow>>(
    `/trending/${mediaType}/week`,
  );
}

// ─── Detail ──────────────────────────────────────────────────────────────────

const APPEND_PARAMS = 'images,credits,videos,watch/providers,recommendations';

export function fetchMovieDetail(movieId: string) {
  return tmdbFetch<MovieDetail>(`/movie/${movieId}`, {
    append_to_response: APPEND_PARAMS,
  });
}

export function fetchTVShowDetail(tvId: string) {
  return tmdbFetch<TVShowDetail>(`/tv/${tvId}`, {
    append_to_response: APPEND_PARAMS,
  });
}

// ─── Search ──────────────────────────────────────────────────────────────────

export function searchMulti(query: string, page = 1) {
  return tmdbFetch<TMDBPaginatedResponse<SearchResult>>('/search/multi', {
    query,
    page: String(page),
    include_adult: 'false',
  });
}

// ─── Trailers ────────────────────────────────────────────────────────────────

/** YouTube watch URL for the detail response's first official trailer. */
export function getTrailerUrl(
  videos: {results: Video[]} | undefined,
): string | null {
  const trailer = videos?.results.find(
    v =>
      v.site === 'YouTube' &&
      (v.type === 'Trailer' || v.type === 'Teaser') &&
      v.official,
  );
  const firstYouTube =
    trailer ?? videos?.results.find(v => v.site === 'YouTube');
  return firstYouTube
    ? `https://www.youtube.com/watch?v=${firstYouTube.key}`
    : null;
}

// ─── Image URLs ──────────────────────────────────────────────────────────────

/**
 * TMDB image size buckets.
 * Docs: https://developers.themoviedb.org/3/configuration/get-api-configuration
 */
export const IMAGE_SIZES = {
  poster: [92, 154, 185, 342, 500, 780],
  backdrop: [300, 780, 1280],
  profile: [45, 185, 632],
  logo: [45, 92, 154, 185, 300, 500],
} as const;

/**
 * Pick the smallest available TMDB image size that is >= targetPx.
 * Falls back to 'original' if the target exceeds all buckets.
 */
export function pickOptimalSize(
  targetPx: number,
  availableSizes: readonly number[],
): string {
  const best = availableSizes.find(s => s >= targetPx);
  return best ? `w${best}` : 'original';
}

export function getImageUrl(
  path: string | null,
  width: string = 'w500',
): string | null {
  if (!path) return null;
  return `${IMAGE_URL}${width}${path}`;
}

/**
 * Returns the smallest available TMDB image URL for use as a blurry placeholder.
 * The HD image loads on top and smoothly crossfades via expo-image's transition.
 */
export function getPlaceholderUrl(
  path: string | null,
  type: 'poster' | 'backdrop' | 'profile' | 'logo' = 'poster',
): string | null {
  if (!path) return null;
  const smallest = IMAGE_SIZES[type][0];
  return getImageUrl(path, `w${smallest}`);
}

/**
 * Get poster URL with dynamic size optimization.
 * Pass `displayWidth` to fetch the optimal image size for the device's resolution.
 */
export function getPosterUrl(
  path: string | null,
  displayWidth?: number,
): string | null {
  const width = displayWidth
    ? pickOptimalSize(displayWidth, IMAGE_SIZES.poster)
    : 'w500';
  return getImageUrl(path, width);
}

/**
 * Get backdrop URL with dynamic size optimization.
 * Pass `displayWidth` (typically the screen width) to fetch the optimal size.
 */
export function getBackdropUrl(
  path: string | null,
  displayWidth?: number,
): string | null {
  const width = displayWidth
    ? pickOptimalSize(displayWidth, IMAGE_SIZES.backdrop)
    : 'original';
  return getImageUrl(path, width);
}

/**
 * Get profile URL with dynamic size optimization.
 * Pass `displayWidth` to fetch the optimal size for the device.
 */
export function getProfileUrl(
  path: string | null,
  displayWidth?: number,
): string | null {
  const width = displayWidth
    ? pickOptimalSize(displayWidth, IMAGE_SIZES.profile)
    : 'w185';
  return getImageUrl(path, width);
}

/**
 * Get logo URL with dynamic size optimization.
 * Pass `displayWidth` to fetch the optimal size for the device.
 */
export function getLogoUrl(
  path: string | null,
  displayWidth?: number,
): string | null {
  const width = displayWidth
    ? pickOptimalSize(displayWidth, IMAGE_SIZES.logo)
    : 'w185';
  return getImageUrl(path, width);
}
