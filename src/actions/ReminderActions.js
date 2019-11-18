import {
  TOGGLE_REMINDERS,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  START_REMINDER,
} from './types';
import { scheduleNotification } from '../functions/ScheduleNotification';

export const toggleReminders = (item) => {
  return {
    type: TOGGLE_REMINDERS,
    id: item.id
  };
};

export const tenMinReminder = (item) => { //I tried to refactor this to be very similar to
  return (dispatch) => { //the way cancel notifications is set up but it didn't work because
    dispatch({ //there are issues trying to pull in the schedule notification function into the
      type: TEN_MIN_REMINDER, //todo reducer
      id: item.id
    });
    scheduleNotification.tenMinReminder(item);
  };
};

export const thirtyMinReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: THIRTY_MIN_REMINDER,
      id: item.id
    });
    scheduleNotification.thirtyMinReminder(item);
  };
};

export const oneHourReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: ONE_HOUR_REMINDER,
      id: item.id
    });
    scheduleNotification.oneHourReminder(item);
  };
};

export const oneDayReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: ONE_DAY_REMINDER,
      id: item.id
    });
    scheduleNotification.oneDayReminder(item);
  };
};

export const startReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: START_REMINDER,
      id: item.id
    });
    scheduleNotification.startReminder(item);
  };
};
