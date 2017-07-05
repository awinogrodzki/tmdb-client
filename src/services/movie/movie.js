import axios from 'axios';

import {
  API_KEY,
  API_URL,
  DISCOVER_URI,
  GENRES_URI,
  SEARCH_KEYWORDS_URI,
  SEARCH_PEOPLE_URI,
  SEARCH_COMPANIES_URI,
  MOVIE_URI,
  IMAGE_URL,
} from './constants';

const getImageUrl = (image, size = 500) => (image ? `${IMAGE_URL}${size}${image}` : null);
const getUrl = uri => `${API_URL}${uri}?api_key=${API_KEY}`;

const mapResponse = (response) => {
  const data = response.data;
  return data;
};

export default {
  discover(filters = {}) {
    return axios.get(getUrl(DISCOVER_URI), { params: filters })
      .then(response => mapResponse(response));
  },

  getMovie(id) {
    return axios.get(getUrl(`${MOVIE_URI}/${id}`), { params: { append_to_response: 'videos,images' } })
      .then(response => mapResponse(response));
  },

  getGenres() {
    return axios.get(getUrl(GENRES_URI))
      .then(response => mapResponse(response));
  },

  searchKeywords(query = null) {
    return axios.get(getUrl(SEARCH_KEYWORDS_URI), { params: { query } })
      .then(response => mapResponse(response));
  },

  searchPeople(query = null) {
    return axios.get(getUrl(SEARCH_PEOPLE_URI), { params: { query } })
      .then(response => mapResponse(response));
  },

  searchCompanies(query = null) {
    return axios.get(getUrl(SEARCH_COMPANIES_URI), { params: { query } })
      .then(response => mapResponse(response));
  },

  getImageUrl,
  getUrl,
};
