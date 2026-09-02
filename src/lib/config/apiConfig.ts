// The TMDB key is inlined at build time from EXPO_PUBLIC_TMDB_API_KEY (see
// .env.example). There is deliberately no fallback: a missing key must fail
// loudly instead of silently shipping a key committed to source.
const TMDB_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

if (!TMDB_KEY) {
  throw new Error(
    'Missing EXPO_PUBLIC_TMDB_API_KEY. Copy .env.example to .env and set your key from https://www.themoviedb.org/settings/api',
  );
}

export const APIHOST = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const defaultQueryOptions = {
  api_key: TMDB_KEY,
};
