import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import { getGenresState } from '../redux/genres';
import { getMovie, getMovieState, resetState } from '../redux/movie';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector((store) => getMovieState(store).movie);
  const isFetchingMovie = useSelector((store) => getMovieState(store).isFetching);
  const recommendations = useSelector((store) => getMovieState(store).recommendations.results);
  const genres = useSelector((store) => getGenresState(store).genres);
  const isFetchingGenres = useSelector((store) => getGenresState(store).isFetching);

  useEffect(() => {
    dispatch(getMovie(id ? parseInt(id, 10) : 0));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, id]);

  if (isFetchingMovie || isFetchingGenres) {
    return (<Loader />);
  }

  return (
    <Movie
      genres={ genres }
      movie={ movie }
      recommendations={ recommendations }
    />
  );
};

export default MovieDetails;
