import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
  AFTER_CLASS_NOTIFICATION_RECEIVED
} from '../actions/types';

const initialState = {
  notificationIDs: [],
  classNameFromNotification: ''
};

const storage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ID:
      return {
        ...state,
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
      return { ...state, notificationIDs: action.newList };
    case CANCEL_ALL_NOTIFICATIONS: {
      return { ...state, notificationIDs: action.newList };
    }
    case AFTER_CLASS_NOTIFICATION_RECEIVED:
      return { ...state, classNameFromNotification: action.payload };
    default:
      return state;
  }
};

export default storage;
