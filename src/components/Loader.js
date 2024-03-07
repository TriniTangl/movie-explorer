import { Box, CircularProgress, styled } from '@mui/material';

const LoaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

const Loader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
