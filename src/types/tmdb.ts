/** Core TMDB API response types */

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MediaItem {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  adult: boolean;
}

export interface Movie extends MediaItem {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TVShow extends MediaItem {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  known_for: (Movie | TVShow)[];
  popularity: number;
  adult: boolean;
}

/**
 * /search/multi responses always tag each item with media_type, which the
 * list endpoints do not — so search results are their own discriminated union.
 */
export interface SearchMovie extends Movie {
  media_type: 'movie';
}

export interface SearchTVShow extends TVShow {
  media_type: 'tv';
}

export interface SearchPerson extends Person {
  media_type: 'person';
}

export type SearchResult = SearchMovie | SearchTVShow | SearchPerson;

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
}

export interface MovieImages {
  backdrops: MovieImage[];
  posters: MovieImage[];
  logos: MovieImage[];
}

export interface WatchProviderInfo {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviderCountry {
  flatrate?: WatchProviderInfo[];
  rent?: WatchProviderInfo[];
  buy?: WatchProviderInfo[];
}

export interface WatchProviders {
  results: Record<string, WatchProviderCountry>;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  videos: {results: Video[]};
  credits: Credits;
  images: MovieImages;
  'watch/providers': WatchProviders;
  recommendations: TMDBPaginatedResponse<Movie>;
  similar: TMDBPaginatedResponse<Movie>;
}

export interface TVShowDetail extends TVShow {
  genres: Genre[];
  episode_run_time: number[];
  status: string;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
  created_by: CrewMember[];
  networks: ProductionCompany[];
  seasons: Season[];
  videos: {results: Video[]};
  credits: Credits;
  images: MovieImages;
  'watch/providers': WatchProviders;
  recommendations: TMDBPaginatedResponse<TVShow>;
  similar: TMDBPaginatedResponse<TVShow>;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  air_date: string;
}
