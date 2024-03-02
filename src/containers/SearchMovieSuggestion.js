import React from 'react';
import { useSelector } from 'react-redux';
import Suggestion from '../components/Suggestion';

const SearchMovieSuggestion = () => {
  const { search } = useSelector((store) => store);

  return (<Suggestion movies={ search } />);
};

export default SearchMovieSuggestion;
