export default {
  movie: {
    voteCount: 'Vote count',
    voteAverage: 'Vote average',
    releaseDate: 'Released',
  },
  movies: {
    dates: 'Dates',
    votes: 'Votes',
    date: {
      primaryReleaseYear: 'Released in year',
      primaryReleaseDate: {
        lte: 'Released before',
        gte: 'Released after',
      },
    },
    vote: {
      count: {
        lte: 'Less votes than',
        gte: 'More votes than',
      },
      average: {
        lte: 'Vote average lower or equal',
        gte: 'Vote average greater or equal',
      },
    },
    genres: 'Genres',
    sortBy: 'Sort by',
    sort: {
      popularity: {
        asc: 'Least popular',
        desc: 'Most popular',
      },
      releaseDate: {
        asc: 'Released earliest',
        desc: 'Released latest',
      },
      primaryReleaseDate: {
        asc: 'Primary released earliest',
        desc: 'Primary released latest',
      },
      voteCount: {
        asc: 'Least votes',
        desc: 'Most votes',
      },
      voteAverage: {
        asc: 'Worst vote',
        desc: 'Best vote',
      },
    },
  },
};
