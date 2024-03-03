import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genres: [],
  isFetching: false,
};

const genresSlice = createSlice({
  name: 'genresSlice',
  initialState,
  reducers: {
    getGenres: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    fetchedGenres: (state, action) => {
      return {
        ...state,
        genres: action.payload.genres,
        isFetching: false,
      };
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { getGenres, fetchedGenres, resetState } = genresSlice.actions;

export const getGenresState = (state) => state.genres;

export default genresSlice.reducer;
