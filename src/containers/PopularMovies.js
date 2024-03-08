import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Movies from '../components/Movies';
import { getGenresState } from '../redux/genres';
import { getMoviesState, getPopularMovies, resetState } from '../redux/movies';

const PopularMovies = () => {
  const dispatch = useDispatch();
  const hasMore = useSelector((store) => getMoviesState(store).hasMore);
  const page = useSelector((store) => getMoviesState(store).page);
  const isFetchingMovies = useSelector((store) => getMoviesState(store).isFetching);
  const totalResults = useSelector((store) => getMoviesState(store).totalResults);
  const movies = useSelector((store) => getMoviesState(store).results);
  const genres = useSelector((store) => getGenresState(store).genres);
  const isFetchingGenres = useSelector((store) => getGenresState(store).isFetching);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  const loadMore = () => {
    if (hasMore) {
      dispatch(getPopularMovies(page + 1));
    }
  };

  if (page === 0 && (isFetchingMovies || isFetchingGenres)) {
    return (<Loader />);
  }

  return (
    <Box>
      <Typography component="h2" variant="h3" gutterBottom={ true }>
        Popular Movies
      </Typography>
      <InfiniteScroll
        dataLength={ totalResults }
        next={ loadMore }
        hasMore={ hasMore }
        loader={ <Loader /> }
        style={ { overflow: 'hidden' } }
        endMessage={ <p>Yay! You have seen it all!</p> }
      >
        <Movies movies={ movies } genres={ genres } />
      </InfiniteScroll>
    </Box>
  );
};

export default PopularMovies;
