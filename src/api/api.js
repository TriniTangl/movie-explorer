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

  searchMovies = async (query) => {
    const response = await fetch(
      `${ this.apiBaseUrl }/search/movie?query=${ query }`, this.fetchOptions,
    );

    return response.json();
  };

  getGenres = async () => {
    const response = await fetch(
      `${ this.apiBaseUrl }/genre/movie/list?`, this.fetchOptions,
    );

    return response.json();
  };

  getPopularMovies = async (page = 1) => {
    const response = await fetch(
      `${ this.apiBaseUrl }/movie/popular?page=${ page }`, this.fetchOptions,
    );

    return response.json();
  };

  getMovie = async (id) => {
    const response = await fetch(
      `${ this.apiBaseUrl }/movie/${ id }?append_to_response=recommendations`, this.fetchOptions,
    );

    return response.json();
  };
}
