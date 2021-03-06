import axios, { CancelToken } from 'axios';
import movieService from './movie';

jest.mock('services/config', () => {
  const mockConfig = {
    services: {
      movie: {
        api_key: '1ef3f71a318d8d8ed927fdcf2fb90670',
        api_url: 'https://api.themoviedb.org/3',
        uri: '/movie',
        discover_uri: '/discover/movie',
        genres_uri: '/genre/movie/list',
        image_url: 'https://image.tmdb.org/t/p/w',
        search: {
          keywords_uri: '/search/keyword',
          people_uri: '/search/person',
          companies_uri: '/search/company',
          movies_uri: '/search/movie',
        },
      },
    },
  };

  return {
    get: string => require('lodash').get(mockConfig, string), // eslint-disable-line global-require
  };
});

jest.mock('./mappers', () => ({
  mapMoviesResponse: data => data,
  mapMovieResponse: data => data,
  mapPeopleResponse: data => data,
  mapCompaniesResponse: data => data,
  mapKeywordsResponse: data => data,
  mapGenresResponse: data => data,
}));

jest.mock('axios', () => {
  const cancel = jest.fn();

  return {
    get: jest.fn(),
    CancelToken: {
      source: jest.fn(() => ({
        cancel,
        token: 'cancel_token',
      })),
    },
  };
});

axios.get.mockReturnValue(Promise.resolve({}));

describe('movie service', () => {
  beforeEach(() => {
    axios.get.mockClear();
    CancelToken.source.mockClear();
    CancelToken.source().cancel.mockClear();
  });

  it('should properly generate url', () => {
    expect(movieService.getUrl('/test_uri')).toBe('https://api.themoviedb.org/3/test_uri?api_key=1ef3f71a318d8d8ed927fdcf2fb90670');
  });

  it('should be able to discover movies', () => {
    movieService.discover();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.any(Object)
    );
  });

  it('should be able to get movie details by id', () => {
    movieService.getMovie(123);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/123?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.any(Object)
    );
  });

  it('should be able to discover movies with parameters', () => {
    const params = {
      testFilters: [1, 2, 3],
    };

    movieService.discover(params);

    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: {
          testFilters: [1, 2, 3],
        },
      })
    );
  });

  it('should be able to get genres', () => {
    movieService.getGenres();

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.any(Object)
    );
  });

  it('should be able to search keywords', () => {
    movieService.searchKeywords('queryValue');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/keyword?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.objectContaining({
        params: { query: 'queryValue' },
      })
    );
  });

  it('should be able to search people', () => {
    movieService.searchPeople('queryValue');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/person?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.objectContaining({
        params: { query: 'queryValue' },
      })
    );
  });

  it('should be able to search companies', () => {
    movieService.searchCompanies('queryValue');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/company?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.objectContaining({
        params: { query: 'queryValue' },
      })
    );
  });

  it('should be able to search movies', () => {
    movieService.searchMovies('queryValue');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/movie?api_key=1ef3f71a318d8d8ed927fdcf2fb90670',
      expect.objectContaining({
        params: { query: 'queryValue' },
      })
    );
  });

  it('should be able to generate image url', () => {
    expect(movieService.getImageUrl('/test_url')).toBe('https://image.tmdb.org/t/p/w500/test_url');
  });

  it('should return null if image uri is incorrect', () => {
    expect(movieService.getImageUrl(undefined)).toBe(null);
  });

  it('should be able to cancel all requests', async () => {
    movieService.getMovie(123);
    movieService.cancelAllRequests();

    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        cancelToken: 'cancel_token',
      })
    );
    expect(CancelToken.source().cancel).toHaveBeenCalled();
  });

  it('should be able to refresh cancellation token', async () => {
    movieService.refreshCancellationToken();

    expect(CancelToken.source).toHaveBeenCalled();
  });
});
