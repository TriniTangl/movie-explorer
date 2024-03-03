import React from 'react';
import { useSelector } from 'react-redux';
import Suggestion from '../components/Suggestion';

const SearchMovieSuggestion = () => {
  const { search, genres: { genres } } = useSelector((store) => store);

  return (<Suggestion movies={ search } genres={ genres } />);
};

export default SearchMovieSuggestion;
