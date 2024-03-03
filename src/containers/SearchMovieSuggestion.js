import React from 'react';
import { useSelector } from 'react-redux';
import Suggestion from '../components/Suggestion';
import { getGenresState } from '../redux/genres';
import { getSearchState } from '../redux/search';

const SearchMovieSuggestion = () => {
  const movies = useSelector((store) => getSearchState(store).results);
  const genres = useSelector((store) => getGenresState(store).genres);

  return (<Suggestion movies={ movies } genres={ genres } />);
};

export default SearchMovieSuggestion;
