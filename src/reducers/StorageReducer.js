import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS
} from '../actions/types';

const initialState = {
  notificationIDs: [],
};

const storage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ID:
      return {
        notificationIDs:
        [
          ...state.notificationIDs,
          {
            itemID: action.id,
            reminderType: action.reminderType,
            notificationID: action.notificationID
          }
        ]
      };
    case CANCEL_NOTIFICATION:
      return { notificationIDs: action.newList };
    case CANCEL_ALL_NOTIFICATIONS: {
      return { notificationIDs: action.newList };
    }
    default:
      return state;
  }
};

export default storage;
