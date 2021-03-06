import config from 'services/config';

export const API_KEY = config.get('services.movie.api_key');
export const API_URL = config.get('services.movie.api_url');
export const DISCOVER_URI = config.get('services.movie.discover_uri');
export const GENRES_URI = config.get('services.movie.genres_uri');
export const SEARCH_KEYWORDS_URI = config.get(
  'services.movie.search.keywords_uri'
);
export const SEARCH_PEOPLE_URI = config.get('services.movie.search.people_uri');
export const SEARCH_COMPANIES_URI = config.get(
  'services.movie.search.companies_uri'
);
export const SEARCH_MOVIES_URI = config.get('services.movie.search.movies_uri');
export const IMAGE_URL = config.get('services.movie.image_url');
export const MOVIE_URI = config.get('services.movie.uri');
export const CONFIGURATION_URI = config.get('services.movie.configuration_uri');
