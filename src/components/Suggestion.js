import { Autocomplete, Grid, MenuItem, styled, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { COVER_PLACEHOLDER, IMAGES_PATH } from '../config';
import { mapGenres } from '../helpers/helper';
import { searchMovies, resetState } from '../redux/search';

const LinkStyled = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  width: '100%',
});

const ImgStyled = styled('img')({
  width: 100,
  objectFit: 'cover',
});

const TitleStyled = styled(Typography)({
  color: 'white',
  paddingTop: 10,
});

const SubtitleStyled = styled(Typography)({
  color: 'white',
});

const Suggestion = ({ movies, genres }) => {
  const dispatch = useDispatch();

  const inputOnChange = (event) => {
    if (event.target.value) {
      dispatch(searchMovies(event.target.value));
    }
  };

  const autocompleteOnChange = (event, value, reason) => {
    if (reason === 'clear') {
      dispatch(resetState());
    }
  };

  return (
    <Autocomplete
      blurOnSelect={ true }
      getOptionLabel={ (movie) => movie.title }
      options={ movies }
      onChange={ autocompleteOnChange }
      isOptionEqualToValue={ (option, value) => option.id === value.id }
      renderOption={ (props, movie) => (
        <MenuItem
          { ...props }
          key={ movie.id }
        >
          <LinkStyled to={ `/movie/${ movie.id }` }>
            <Grid container={ true } spacing={ 8 }>
              <Grid item={ true }>
                {
                  movie.poster_path
                    ? (
                      <ImgStyled
                        src={ `${ IMAGES_PATH }/w154${ movie.poster_path }` }
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
              </Grid>
              <Grid item={ true }>
                <TitleStyled variant="h4">
                  { movie.title }
                </TitleStyled>
                <SubtitleStyled variant="subtitle1">
                  { mapGenres(movie.genre_ids, genres) }
                </SubtitleStyled>
              </Grid>
            </Grid>
          </LinkStyled>
        </MenuItem>
      ) }
      renderInput={ (props) => (
        <TextField
          { ...props }
          placeholder="Search"
          fullWidth={ true }
          variant="standard"
          onChange={ inputOnChange }
        />
      ) }
    />
  );
};

export default Suggestion;
