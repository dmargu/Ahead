import {
  TOGGLE_REMINDERS,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  START_REMINDER
} from './types';
import { scheduleNotification } from '../functions/ScheduleNotification';

export const toggleReminders = (toggleState) => {
  return {
    type: TOGGLE_REMINDERS,
    payload: !toggleState
  };
};

export const tenMinReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: TEN_MIN_REMINDER,
      id: item.id
    });
    scheduleNotification.tenMinReminder(item)
      .then(console.log('notification ready'))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const thirtyMinReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: THIRTY_MIN_REMINDER,
      id: item.id
    });
    scheduleNotification.thirtyMinReminder(item)
      .then(console.log('notification ready'))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const oneHourReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: ONE_HOUR_REMINDER,
      id: item.id
    });
    scheduleNotification.oneHourReminder(item)
      .then(console.log('notification ready'))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const oneDayReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: ONE_DAY_REMINDER,
      id: item.id
    });
    scheduleNotification.oneDayReminder(item)
      .then(console.log('notification ready'))
      .catch((e) => {
        console.log(e);
      });
  };
};

export const startReminder = (item) => {
  return (dispatch) => {
    dispatch({
      type: START_REMINDER,
      id: item.id
    });
    scheduleNotification.startReminder(item)
      .then(console.log('notification ready'))
      .catch((e) => {
        console.log(e);
      });
  };
};
