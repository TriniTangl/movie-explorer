import { configureStore } from '@reduxjs/toolkit';
import watcherSaga from '../sagas';
import searchReducer from './search';
import genresReducer from './genres';
import moviesReducer from './movies';
import movieReducer from './movie';
import alertsReducer from './alerts';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchReducer,
    genres: genresReducer,
    movies: moviesReducer,
    movie: movieReducer,
    alerts: alertsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(watcherSaga);

export default store;
