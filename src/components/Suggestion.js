import { Autocomplete, Grid, MenuItem, styled, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { COVER_PLACEHOLDER, IMAGES_PATH } from '../constants/config';
import { mapGenres } from '../helpers/helper';
import { resetState, searchMovies } from '../redux/search';

const LinkStyled = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  width: '100%',
});

const ImgStyled = styled('img')({
  width: 100,
  objectFit: 'cover',
});

const TypographyStyled = styled(Typography)({
  color: 'white',
  display: 'block',
  width: '100%',
  textWrap: 'wrap',
});

const Suggestion = ({ genres, movies }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const inputOnChange = (event) => {
    if (event.target.value) {
      dispatch(searchMovies(event.target.value));
    }
  };

  const autocompleteOnChange = (event, value, reason) => {
    if (reason === 'clear' || value === '') {
      dispatch(resetState());
    }
  };

  return (
    <Autocomplete
      clearOnBlur={ false }
      clearOnEscape={ false }
      getOptionLabel={ (movie) => movie.title }
      options={ movies }
      onChange={ autocompleteOnChange }
      onInputChange={ autocompleteOnChange }
      noOptionsText="Nothing to show. Type to start searching..."
      isOptionEqualToValue={ (option, value) => option.id === value.id }
      renderOption={ (props, movie) => (
        <MenuItem
          { ...props }
          key={ movie.id }
        >
          <LinkStyled to={ `/movie/${ movie.id }` }>
            <Grid container={ true } spacing={ 4 } wrap="nowrap">
              <Grid item={ true }>
                <ImgStyled
                  src={ movie.poster_path
                    ? `${ IMAGES_PATH }/w154${ movie.poster_path }`
                    : COVER_PLACEHOLDER }
                  alt={ movie.title }
                />
              </Grid>
              <Grid item={ true }>
                <TypographyStyled variant={ matchDownSm ? 'h6' : 'h4' }>
                  { movie.title }
                </TypographyStyled>
                <TypographyStyled variant={ matchDownSm ? 'subtitle2' : 'subtitle1' }>
                  { mapGenres(movie.genre_ids, genres) }
                </TypographyStyled>
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
