import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
  AFTER_CLASS_NOTIFICATION_RECEIVED,
  ADD_ICAL_EVENTS,
  CONNECT_TO_ICAL,
  STORE_SOURCE_ID
} from '../actions/types';

const initialState = {
  notificationIDs: [],
  classNameFromNotification: '',
  shouldConnectToIcal: false,
  iCalSourceID: '',
  iCalEvents: []
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
    case ADD_ICAL_EVENTS:
      return { ...state, iCalEvents: action.payload };
    case CONNECT_TO_ICAL:
      return { ...state, shouldConnectToIcal: true };
    case STORE_SOURCE_ID:
      return { ...state, iCalSourceID: action.payload };
    default:
      return state;
  }
};

export default storage;
