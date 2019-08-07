import { TOGGLE_REMINDERS } from '../actions/types';

const initialState = {
  reminderToggleActive: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REMINDERS:
      return { ...state, reminderToggleActive: action.payload };
    default:
      return state;
  }
};
