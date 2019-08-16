import {
  TOGGLE_REMINDERS,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  START_REMINDER
} from './types';

export const toggleReminders = (toggleState) => {
  return {
    type: TOGGLE_REMINDERS,
    payload: !toggleState
  };
};

export const tenMinReminder = (item) => {
  return {
    type: TEN_MIN_REMINDER,
    id: item.id,
  };
};

export const thirtyMinReminder = (item) => {
  return {
    type: THIRTY_MIN_REMINDER,
    id: item.id,
  };
};

export const oneHourReminder = (item) => {
  return {
    type: ONE_HOUR_REMINDER,
    id: item.id,
  };
};

export const oneDayReminder = (item) => {
  return {
    type: ONE_DAY_REMINDER,
    id: item.id,
  };
};

export const startReminder = (item) => {
  return {
    type: START_REMINDER,
    id: item.id
  };
};
