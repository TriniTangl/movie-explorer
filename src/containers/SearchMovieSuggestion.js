import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Suggestion from '../components/Suggestion';
import { getGenresState } from '../redux/genres';
import { getSearchState } from '../redux/search';

const SearchMovieSuggestion = () => {
  const movies = useSelector((store) => getSearchState(store).results);
  const genres = useSelector((store) => getGenresState(store).genres);

  return (
    <Box sx={ { mt: 2, mb: 4 } }>
      <Suggestion movies={ movies } genres={ genres } />
    </Box>
  );
};

export default SearchMovieSuggestion;
