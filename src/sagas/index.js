import { nanoid } from '@reduxjs/toolkit';
import { delay, all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import TheMovieDbApi from '../api/api';
import { AUTH_TOKEN } from '../constants/config';
import { API_ERROR_MESSAGES } from '../constants/enums';
import { addAlert } from '../redux/alerts';
import { fetchedGenres, getGenres } from '../redux/genres';
import { fetchedMovie, getMovie } from '../redux/movie';
import { fetchedPopularMovies, getPopularMovies } from '../redux/movies';
import { fetchedSearchMovies, searchMovies } from '../redux/search';

const api = new TheMovieDbApi(AUTH_TOKEN);

function* fetchGenres() {
  try {
    const response = yield call(api.getGenres);
    const data = yield response.json();

    if (response.ok) {
      yield put(fetchedGenres(data));
    } else {
      throw data.status_message;
    }
  } catch (error) {
    console.error(error);

    yield put(addAlert({
      id: nanoid(),
      message: API_ERROR_MESSAGES.GENRES,
    }));
  }
}

function* fetchSearchMovies(action) {
  yield delay(500);

  try {
    const response = yield call(api.searchMovies, action.payload);
    const data = yield response.json();

    if (response.ok) {
      yield put(fetchedSearchMovies(data));
    } else {
      throw data.status_message;
    }
  } catch (error) {
    console.error(error);

    yield put(addAlert({
      id: nanoid(),
      message: API_ERROR_MESSAGES.SEARCH,
    }));
  }
}

function* fetchPopularMovies(action) {
  try {
    const response = yield call(api.getPopularMovies, action.payload);
    const data = yield response.json();

    if (response.ok) {
      yield put(fetchedPopularMovies(data));
    } else {
      throw data.status_message;
    }
  } catch (error) {
    console.error(error);

    yield put(addAlert({
      id: nanoid(),
      message: API_ERROR_MESSAGES.POPULAR,
    }));
  }
}

function* fetchMovie(action) {
  try {
    const response = yield call(api.getMovie, action.payload);
    const data = yield response.json();

    if (response.ok) {
      yield put(fetchedMovie(data));
    } else {
      throw data.status_message;
    }
  } catch (error) {
    console.error(error);

    yield put(addAlert({
      id: nanoid(),
      message: API_ERROR_MESSAGES.DETAILS,
    }));
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeLeading(getMovie.type, fetchMovie),
    yield takeLeading(getPopularMovies.type, fetchPopularMovies),
    yield takeLeading(getGenres.type, fetchGenres),
    yield takeLatest(searchMovies.type, fetchSearchMovies),
  ]);
}
