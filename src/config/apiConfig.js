export const APIHOST = 'https://api.themoviedb.org/3';
export const TMDB_KEY = '77435f80f33b6b6ffc0ac360e51d912b';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const defaultQueryOptions = {
    api_key: TMDB_KEY,
};

export const apiConfig = {
    getPopularMovies: {
        url: '/movie/popular?',
        method: "GET"
    },
    getPopularTVShows: {
        url: '/tv/popular?',
        method: "GET"
    },
    getTopRatedMovies: {
        url: '/movie/top_rated?',
        method: "GET"
    },
    getTopRatedTVShows: {
        url: '/tv/top_rated?',
        method: "GET"
    },
    getAiringTodayShows: {
        url: '/tv/airing_today?',
        method: "GET"
    },
    getLatestTVShows: {
        url: '/tv/latest?',
        method: "GET"
    },
    getOnTheAirShows: {
        url: '/tv/on_the_air?',
        method: "GET"
    },
    getNowPlayingMovies: {
        url: '/movie/now_playing?',
        method: "GET"
    },
    getUpcomingMovies: {
        url: '/movie/upcoming?',
        method: "GET"
    },
    getLatestMovies: {
        url: '/movie/latest?',
        method: "GET"
    },
    getMovieData: {
        url: '/movie/',
        method: "GET"
    },
    getTVShowData: {
        url: '/tv/',
        method: "GET"
    },
    multiSearch: {
        url: '/search/multi?',
        method: "GET"
    },
    getTrendingMedia: {
        url: '/trending/',
        method: "GET"
    }
}