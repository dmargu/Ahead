import moment from 'moment';
import {
  TOGGLE_REMINDERS,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  START_REMINDER,
  ADD_NOTIFICATION_ID,
  HOMEWORK_REMINDER,
  CHANGE_CUSTOM_REMINDER
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
      id: item.id,
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
      id: item.id,
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
      id: item.id,
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
      id: item.id,
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
      id: item.id,
      reminderType: 'start',
      notificationID
    });
  };
};

export const changeCustomReminder = (id, date) => {
  return {
    type: CHANGE_CUSTOM_REMINDER,
    id,
    reminderTime: date
  };
};

export const defaultHomeworkReminder = (item, reminderType, reminderDays) => {
  return async (dispatch) => {
    if (moment(item.date).subtract(reminderDays, 'days').isAfter(moment(new Date())) ||
      moment(item.date).subtract(reminderDays, 'days').isSame(moment(new Date()))
    ) {
      dispatch({
        type: HOMEWORK_REMINDER,
        id: item.id,
        reminderType
      });
      const notificationID = await scheduleNotification.homeworkReminder(item.date, reminderType, item);
      dispatch({
        type: ADD_NOTIFICATION_ID,
        id: item.id,
        reminderType,
        notificationID
      });
  }
};
};

export const customHomeworkReminder = (item, reminderDate) => {
  return async (dispatch) => {
    dispatch({
      type: HOMEWORK_REMINDER,
      id: item.id,
      reminderType: 'custom',
      reminderDate
    });
    const notificationID = await scheduleNotification.customHomeworkReminder(reminderDate, item);
    dispatch({
      type: ADD_NOTIFICATION_ID,
      id: item.id,
      reminderType: 'custom',
      notificationID
    });
  };
};
