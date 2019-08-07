import { TOGGLE_REMINDERS } from './types';

export const toggleReminders = (toggleState) => {
  return {
    type: TOGGLE_REMINDERS,
    payload: !toggleState
  };
};
