import PropTypes from 'prop-types';

export const GenreType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const PersonType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

export const MovieDetailsPropTypes = {
  originalTitle: PropTypes.string,
  title: PropTypes.string,
  imdbUrl: PropTypes.string,
  overview: PropTypes.string,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
  genres: PropTypes.arrayOf(GenreType),
  directors: PropTypes.arrayOf(PersonType),
  writers: PropTypes.arrayOf(PersonType),
  cast: PropTypes.arrayOf(PersonType),
};
