import { TextField } from '@mui/material';
import React from 'react';

const Suggestion = () => {
  return (
    <>
      <TextField
        id="search"
        placeholder="Search"
        fullWidth={ true }
        sx={ { mb: 5 } }
        variant="standard"
      />
    </>
  );
};

export default Suggestion;
