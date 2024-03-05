import { delay, all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import TheMovieDbApi from '../api/api';
import { AUTH_TOKEN } from '../config';
import { fetchedGenres, getGenres } from '../redux/genres';
import { fetchedMovie, getMovie } from '../redux/movie';
import { fetchedPopularMovies, getPopularMovies } from '../redux/movies';
import { fetchedSearchMovies, searchMovies } from '../redux/search';

const api = new TheMovieDbApi(AUTH_TOKEN);

function* fetchGenres() {
  yield put(fetchedGenres(yield call(api.getGenres)));
}

function* fetchSearchMovies(action) {
  yield delay(500);

  yield put(
    fetchedSearchMovies(yield call(api.searchMovies, action.payload)),
  );
}

function* fetchPopularMovies(action) {
  yield put(
    fetchedPopularMovies(yield call(api.getPopularMovies, action.payload)),
  );
}

function* fetchMovie(action) {
  yield put(
    fetchedMovie(yield call(api.getMovie, action.payload)),
  );
}

export default function* watcherSaga() {
  yield all([
    yield takeLeading(getMovie.type, fetchMovie),
    yield takeLeading(getPopularMovies.type, fetchPopularMovies),
    yield takeLeading(getGenres.type, fetchGenres),
    yield takeLatest(searchMovies.type, fetchSearchMovies),
  ]);
}
