import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: {},
  recommendations: {
    results: [],
    hasMore: false,
    totalResults: 0,
    page: 0,
    totalPages: 0,
  },
  isFetching: false,
};

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState,
  reducers: {
    getMovie: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchedMovie: (state, action) => {
      return {
        ...state,
        movie: action.payload,
        recommendations: {
          ...state.recommendations,
          results: action.payload.recommendations.results.slice(0, 10),
          totalResults: action.payload.recommendations.total_results,
          page: action.payload.recommendations.page,
          totalPages: action.payload.recommendations.total_pages,
        },
        isFetching: false,
      };
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { getMovie, fetchedMovie, resetState } = movieSlice.actions;

export const getMovieState = (state) => state.movie;

export default movieSlice.reducer;
