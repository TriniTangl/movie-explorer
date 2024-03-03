import { ImageList, ImageListItem, ImageListItemBar, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES_PATH } from '../config';
import { mapGenres } from '../helpers/helper';

const ImgStyled = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Movies = ({ movies, genres }) => {
  return (
    <ImageList cols={ 5 } rowHeight={ 365 } gap={ 12 }>
      {
        movies.results.map((movie) => (
          <ImageListItem key={ movie.id }>
            <Link to={ `/movie/${ movie.id }` }>
              {
                movie.poster_path
                  && (
                    <ImgStyled
                      src={ `${ IMAGES_PATH }/w300${ movie.poster_path }` }
                      alt={ movie.title }
                    />
                  )
              }
              <ImageListItemBar
                title={ movie.title }
                subtitle={ <span>{ mapGenres(movie.genre_ids, genres) }</span> }
              />
            </Link>
          </ImageListItem>
        ))
      }
    </ImageList>
  );
};

export default Movies;
