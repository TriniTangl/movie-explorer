import { delay, all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import TheMovieDbApi from '../api/api';
import { API_KEY } from '../config';
import { fetchedSearchMovies, searchMovies } from '../redux/search';

const api = new TheMovieDbApi(API_KEY);

function* fetchSearchMovies(action) {
  yield delay(500);

  yield put(
    fetchedSearchMovies(yield call(api.searchMovies, action.payload)),
  );
}

export default function* watcherSaga() {
  yield all([
    yield takeLatest(searchMovies.type, fetchSearchMovies),
  ]);
}
