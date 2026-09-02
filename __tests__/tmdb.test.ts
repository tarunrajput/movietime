/**
 * Smoke tests for the TMDB service layer.
 * The API key is injected by jest.setup.js before modules are transformed.
 */
import {
  fetchMediaByCategory,
  getTrailerUrl,
  getImageUrl,
  getPosterUrl,
  pickOptimalSize,
  TMDBError,
} from '@/lib/services/tmdb';
import {defaultQueryOptions} from '@/lib/config/apiConfig';

describe('tmdb config', () => {
  it('builds default query options from the environment key', () => {
    expect(defaultQueryOptions).toEqual({api_key: 'test-api-key'});
  });
});

describe('fetchMediaByCategory', () => {
  afterEach(() => jest.restoreAllMocks());

  function mockFetchOnce(payload: unknown, ok = true) {
    const fetchMock = jest.fn().mockResolvedValue({
      ok,
      status: ok ? 200 : 404,
      statusText: ok ? 'OK' : 'Not Found',
      json: () => Promise.resolve(payload),
    });
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock as any);
    return fetchMock;
  }

  it('routes movie categories to the movie endpoint and tags results', async () => {
    const fetchMock = mockFetchOnce({
      page: 1,
      total_pages: 10,
      total_results: 200,
      results: [{id: 1, title: 'Foo'}],
    });

    const data = await fetchMediaByCategory('movie', 'Popular');
    const requestedUrl = String(fetchMock.mock.calls[0][0]);

    expect(requestedUrl).toContain(
      'https://api.themoviedb.org/3/movie/popular',
    );
    expect(requestedUrl).toContain('api_key=test-api-key');
    expect(data.results[0]).toMatchObject({id: 1, media_type: 'movie'});
  });

  it('routes TV categories to the TV endpoint', async () => {
    const fetchMock = mockFetchOnce({
      page: 1,
      total_pages: 3,
      total_results: 60,
      results: [{id: 2, name: 'Bar'}],
    });

    const data = await fetchMediaByCategory('tv', 'Airing Today');
    const requestedUrl = String(fetchMock.mock.calls[0][0]);

    expect(requestedUrl).toContain('/tv/airing_today');
    expect(data.results[0]).toMatchObject({id: 2, media_type: 'tv'});
  });

  it('rejects an unknown category without hitting the network', async () => {
    const fetchMock = mockFetchOnce({results: []});
    await expect(fetchMediaByCategory('movie', 'Nonexistent')).rejects.toThrow(
      'Unknown movie category: Nonexistent',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws TMDBError on HTTP failures', async () => {
    mockFetchOnce({}, false);
    await expect(fetchMediaByCategory('tv', 'Popular')).rejects.toBeInstanceOf(
      TMDBError,
    );
  });
});

describe('getTrailerUrl', () => {
  it('prefers the official YouTube trailer', () => {
    expect(
      getTrailerUrl({
        results: [
          {key: 'a', site: 'YouTube', type: 'Clip', official: false},
          {key: 'b', site: 'YouTube', type: 'Trailer', official: true},
        ] as any,
      }),
    ).toBe('https://www.youtube.com/watch?v=b');
  });

  it('falls back to any YouTube video, else null', () => {
    expect(
      getTrailerUrl({
        results: [{key: 'a', site: 'YouTube', type: 'Clip'}] as any,
      }),
    ).toBe('https://www.youtube.com/watch?v=a');
    expect(getTrailerUrl({results: []})).toBeNull();
    expect(getTrailerUrl(undefined)).toBeNull();
  });
});

describe('image helpers', () => {
  it('return null for null paths', () => {
    expect(getImageUrl(null)).toBeNull();
    expect(getPosterUrl(null)).toBeNull();
  });

  it('pick the smallest bucket >= target, else original', () => {
    expect(pickOptimalSize(120, [92, 154, 185])).toBe('w154');
    expect(pickOptimalSize(4000, [92, 154, 185])).toBe('original');
  });

  it('compose poster URLs with the chosen width', () => {
    expect(getPosterUrl('/p.jpg', 120)).toBe(
      'https://image.tmdb.org/t/p/w154/p.jpg',
    );
    expect(getPosterUrl('/p.jpg')).toBe(
      'https://image.tmdb.org/t/p/w500/p.jpg',
    );
  });
});
