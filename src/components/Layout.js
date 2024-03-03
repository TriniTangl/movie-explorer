import { createTheme, CssBaseline, styled, ThemeProvider } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/img/logo.png';
import SearchMovieSuggestion from '../containers/SearchMovieSuggestion';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Img = styled('img')({
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  width: 500,
  maxWidth: '100%',
});

const LayoutWrapper = styled('div')(({ theme }) => ({
  margin: 24,
  width: 'auto',
  [theme.breakpoints.up('lg')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.breakpoints.values.lg,
  },
}));

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={ darkTheme }>
      <CssBaseline />
      <LayoutWrapper>
        <Link to="/">
          <Img alt="The movie DB" src={ logoImg } />
        </Link>
        <SearchMovieSuggestion />
        { children }
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
