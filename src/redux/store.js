import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from '../sagas';
import alertsReducer from './alerts';
import genresReducer from './genres';
import movieReducer from './movie';
import moviesReducer from './movies';
import searchReducer from './search';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    genres: genresReducer,
    movie: movieReducer,
    movies: moviesReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(watcherSaga);

export default store;
