import { Alert, AlertTitle } from '@mui/material';
import { useEffect } from 'react';

const ErrorAlert = ({ alert, autoHideDuration, onClose, ...props }) => {
  useEffect(() => {
    const showTimer = setTimeout(() => {
      onClose(alert.id);
    }, autoHideDuration);

    return () => {
      clearTimeout(showTimer);
    };
  }, [alert, autoHideDuration, onClose]);

  return (
    <Alert
      { ...props }
      variant="standard"
      severity="error"
      sx={ { mb: 1 } }
      onClose={ () => onClose(alert.id) }
    >
      <AlertTitle>Oops! Something went wrong!</AlertTitle>
      { alert.message }
    </Alert>
  );
};

export default ErrorAlert;
