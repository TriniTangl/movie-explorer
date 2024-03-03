import { delay, all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import TheMovieDbApi from '../api/api';
import { API_KEY } from '../config';
import { fetchedGenres, getGenres } from '../redux/genres';
import { fetchedPopularMovies, getPopularMovies } from '../redux/movies';
import { fetchedSearchMovies, searchMovies } from '../redux/search';

const api = new TheMovieDbApi(API_KEY);

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

export default function* watcherSaga() {
  yield all([
    yield takeEvery(getPopularMovies.type, fetchPopularMovies),
    yield takeEvery(getGenres.type, fetchGenres),
    yield takeLatest(searchMovies.type, fetchSearchMovies),
  ]);
}
