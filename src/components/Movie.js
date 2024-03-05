import { Grid, styled, Typography } from '@mui/material';
import { COVER_PLACEHOLDER, IMAGES_PATH } from '../config';
import Movies from './Movies';

const GridStyled = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ImgStyled = styled('img')({
  width: '100%',
});

const Movie = ({ movie, recommendations, genres }) => {
  const getDetailsBlock = (title, info) => {
    return info
      ? (
        <>
          <Typography component="h3" variant="h6">
            { title }
          </Typography>
          <Typography variant="body1" gutterBottom={ true }>
            { info }
          </Typography>
        </>
      )
      : null;
  };

  const formatRuntime = (runtime = 0) => {
    runtime = Number(runtime);
    const hours = Math.floor(runtime / 60) + 'h';
    const minutes = (runtime % 60) + 'm';

    return runtime ? `${ hours } ${ minutes }` : '';
  };

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      )
      : '';
  };

  return (
    <>
      <GridStyled container={ true } spacing={ 2 }>
        <Grid item={ true } md={ 3 } xs={ 12 }>
          {
            movie.poster_path
              ? <ImgStyled
                src={ `${ IMAGES_PATH }/w300${ movie.poster_path }` }
                alt={ movie.title }
              />
              : <ImgStyled
                src={ COVER_PLACEHOLDER }
                alt={ movie.title }
              />
          }
        </Grid>
        <Grid item={ true } md={ 9 } xs={ 12 }>
          <Typography component="h1" variant="h3" gutterBottom={ true }>
            { movie.title }
          </Typography>
          { getDetailsBlock('Tagline:', movie.tagline) }
          { getDetailsBlock('Genres:', movie.genres?.map((genre) => genre.name).join(', ')) }
          { getDetailsBlock('Country:', movie.production_countries?.map((country) => country.name).join(', ')) }
          { getDetailsBlock('Duration:', formatRuntime(movie.runtime)) }
          { getDetailsBlock('Release Date:', formatDate(movie.release_date)) }
          { getDetailsBlock('Overview:', movie.overview) }
        </Grid>
      </GridStyled>
      {
        recommendations && recommendations.length
          ? (
            <>
              <Typography component="h2" variant="h4" gutterBottom={ true }>
                Recommended
              </Typography>
              <Movies movies={ recommendations } genres={ genres } />
            </>
          )
          : null
      }
    </>
  );
};

export default Movie;
