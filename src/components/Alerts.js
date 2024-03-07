import { Box, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlertsState, removeAlert, resetState } from '../redux/alerts';
import ErrorAlert from './ErrorAlert';

const Alerts = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((store) => getAlertsState(store).alerts);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const onClose = (id) => {
    dispatch(removeAlert(id));
  };

  return (
    <Snackbar open={ Boolean(alerts.length) }>
      <Box>
        {
          alerts.map((alert) => (
            <ErrorAlert
              key={ alert.id }
              alert={ alert }
              onClose={ onClose }
              autoHideDuration={ 5000 }
            />
          ))
        }
      </Box>
    </Snackbar>
  );
};

export default Alerts;
