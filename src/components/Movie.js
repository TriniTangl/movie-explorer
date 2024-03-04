import { Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { COVER_PLACEHOLDER_FOR_MAIN_PAGE, IMAGES_PATH } from '../config';
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
                src={ COVER_PLACEHOLDER_FOR_MAIN_PAGE }
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
          { getDetailsBlock('Release Date:', new Date(movie.release_date).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          )) }
          { getDetailsBlock('Overview:', movie.overview) }
        </Grid>
      </GridStyled>
      {
        recommendations && recommendations.length && (
          <>
            <Typography component="h2" variant="h4" gutterBottom={ true }>
              Recommended
            </Typography>
            <Movies movies={ recommendations } genres={ genres } />
          </>
        )
      }
    </>
  );
};

export default Movie;
