import { get } from 'lodash';
import movieService from 'services/movie';
import {
  DISCOVER_MOVIES,
  GET_GENRES,
  SEARCH_KEYWORDS,
  CLEAR_KEYWORDS,
  SEARCH_PEOPLE,
  CLEAR_PEOPLE,
  SEARCH_COMPANIES,
  CLEAR_COMPANIES,
  SEARCH_MOVIES,
  CLEAR_MOVIES,
  GET_MOVIE,
} from './types';

const discoverMovies = (filters, append = false) =>
  (dispatch, getState) => movieService.discover(filters)
    .then((data) => {
      const currentMovies = get(getState(), 'movies.items');

      dispatch({
        type: DISCOVER_MOVIES,
        items: append ? currentMovies.concat(data.items) : data.items,
        page: data.page,
        pageCount: data.pageCount,
        itemCount: data.itemCount,
      });

      return data;
    });

const getGenres = () => dispatch => movieService.getGenres()
  .then((data) => {
    dispatch({
      type: GET_GENRES,
      genres: data.genres,
    });

    return data;
  });

const searchKeywords = query => dispatch => movieService.searchKeywords(query)
  .then((data) => {
    dispatch({
      type: SEARCH_KEYWORDS,
      keywords: data.results,
    });

    return data;
  });

const clearKeywords = () => ({
  type: CLEAR_KEYWORDS,
});

const searchPeople = query => dispatch => movieService.searchPeople(query)
  .then((data) => {
    dispatch({
      type: SEARCH_PEOPLE,
      people: data.results,
    });

    return data;
  });

const clearPeople = () => ({
  type: CLEAR_PEOPLE,
});

const searchCompanies = query => dispatch => movieService.searchCompanies(query)
  .then((data) => {
    dispatch({
      type: SEARCH_COMPANIES,
      companies: data.results,
    });

    return data;
  });

const clearCompanies = () => ({
  type: CLEAR_COMPANIES,
});

const searchMovies = query => dispatch => movieService.searchMovies(query)
  .then((data) => {
    dispatch({
      type: SEARCH_MOVIES,
      movies: data.items,
    });

    return data;
  });

const clearMovies = () => ({
  type: CLEAR_MOVIES,
});

const getMovie = id => dispatch => movieService.getMovie(id)
  .then((data) => {
    dispatch({
      type: GET_MOVIE,
      details: data,
    });

    return data;
  });

module.exports = {
  discoverMovies,
  getGenres,
  searchKeywords,
  clearKeywords,
  searchPeople,
  clearPeople,
  searchCompanies,
  clearCompanies,
  searchMovies,
  clearMovies,
  getMovie,
};
