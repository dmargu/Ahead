import {
  TOGGLE_REMINDERS,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  START_REMINDER,
  ADD_NOTIFICATION_ID
} from './types';
import { scheduleNotification } from '../functions/ScheduleNotification';

export const toggleReminders = (item) => {
  return {
    type: TOGGLE_REMINDERS,
    id: item.id
  };
};

export const tenMinReminder = (item) => { //I tried to refactor this to be very similar to
  return async (dispatch) => { //the way cancel notifications is set up but it didn't work because
    dispatch({ //there are issues trying to pull in the schedule notification function into the
      type: TEN_MIN_REMINDER, //todo reducer
      id: item.id
    });
    const notificationID = await scheduleNotification.tenMinReminder(item);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      item,
      reminderType: 'tenMin',
      notificationID
    });
  };
};

export const thirtyMinReminder = (item) => {
  return async (dispatch) => {
    dispatch({
      type: THIRTY_MIN_REMINDER,
      id: item.id
    });
    const notificationID = await scheduleNotification.thirtyMinReminder(item);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      item,
      reminderType: 'thirtyMin',
      notificationID
    });
  };
};

export const oneHourReminder = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ONE_HOUR_REMINDER,
      id: item.id
    });
    const notificationID = await scheduleNotification.oneHourReminder(item);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      item,
      reminderType: 'oneHour',
      notificationID
    });
  };
};

export const oneDayReminder = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ONE_DAY_REMINDER,
      id: item.id
    });
    const notificationID = await scheduleNotification.oneDayReminder(item);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      item,
      reminderType: 'oneDay',
      notificationID
    });
  };
};

export const startReminder = (item) => {
  return async (dispatch) => {
    dispatch({
      type: START_REMINDER,
      id: item.id
    });

    const notificationID = await scheduleNotification.startReminder(item);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      item,
      reminderType: 'start',
      notificationID
    });
  };
};
