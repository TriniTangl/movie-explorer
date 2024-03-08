import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: 'alertsSlice',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    },
    removeAlert: (state, action) => {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { addAlert, removeAlert, resetState } = alertsSlice.actions;

export const getAlertsState = (state) => state.alerts;

export default alertsSlice.reducer;
