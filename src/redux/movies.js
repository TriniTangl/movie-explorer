import { createSlice } from '@reduxjs/toolkit';
import { cleanFromDuplicates } from '../helpers/helper';

const initialState = {
  results: [],
  hasMore: false,
  totalResults: 0,
  page: 0,
  totalPages: 0,
  isFetching: false,
};

const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    getPopularMovies: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchedPopularMovies: (state, action) => {
      return {
        ...state,
        results: cleanFromDuplicates(state.results, action.payload.results),
        hasMore: action.payload.page < action.payload.total_pages,
        totalResults: action.payload.total_results,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
        isFetching: false,
      };
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { getPopularMovies, fetchedPopularMovies, resetState } = moviesSlice.actions;

export default moviesSlice.reducer;
