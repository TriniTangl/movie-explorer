import { ImageList, ImageListItem, ImageListItemBar, styled, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { COVER_PLACEHOLDER, IMAGES_PATH } from '../constants/config';
import { mapGenres } from '../helpers/helper';

const ImgStyled = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ImageListItemStyled = styled(ImageListItem)({
  overflow: 'hidden',
});

const Movies = ({ movies, genres }) => {
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ImageList cols={ matchDownSm ? 1 : 5 } rowHeight={ matchDownSm ? 580 : 355 } gap={ 12 }>
      {
        movies.map((movie) => (
          <ImageListItemStyled key={ movie.id }>
            <Link to={ `/movie/${ movie.id }` }>
              {
                movie.poster_path
                  ? (
                    <ImgStyled
                      src={ `${ IMAGES_PATH }/w300${ movie.poster_path }` }
                      alt={ movie.title }
                    />
                  )
                  : (
                    <ImgStyled
                      src={ COVER_PLACEHOLDER }
                      alt={ movie.title }
                    />
                  )
              }
              <ImageListItemBar
                title={ movie.title }
                subtitle={ <span>{ mapGenres(movie.genre_ids, genres) }</span> }
              />
            </Link>
          </ImageListItemStyled>
        ))
      }
    </ImageList>
  );
};

export default Movies;
