export default class TheMovieDbApi {
  apiBaseUrl = 'https://api.themoviedb.org/3';
  fetchOptions;

  constructor(authToken) {
    this.fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ authToken }`,
      },
    };
  }

  searchMovies = (query) => {
    return fetch(`${ this.apiBaseUrl }/search/movie?query=${ query }`, this.fetchOptions);
  };

  getGenres = () => {
    return fetch(`${ this.apiBaseUrl }/genre/movie/list?`, this.fetchOptions);
  };

  getPopularMovies = (page = 1) => {
    return fetch(`${ this.apiBaseUrl }/movie/popular?page=${ page }`, this.fetchOptions);
  };

  getMovie = (id) => {
    return fetch(`${ this.apiBaseUrl }/movie/${ id }?append_to_response=recommendations`, this.fetchOptions);
  };
}
