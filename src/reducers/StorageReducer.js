import { Notifications } from 'expo';
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
        ...state,
        notificationIDs:
        [
          ...state.notificationIDs,
          {
            itemID: action.item.id,
            reminderType: action.reminderType,
            notificationID: action.notificationID
          }
        ]
      };
    case CANCEL_NOTIFICATION: {
      const notificationData = state.notificationIDs.find(
        obj => (obj.itemID === action.id && obj.reminderType === action.reminderType)
      );
      Notifications.cancelScheduledNotificationAsync(notificationData.notificationID);
      console.log(notificationData);
      const newList = state.notificationIDs.filter(obj => obj !== notificationData);
      return { notificationIDs: newList };
    }
    case CANCEL_ALL_NOTIFICATIONS: {
      const notificationData = state.notificationIDs.filter(obj => (obj.itemID === action.id));
      if (notificationData) {
        for (let x = 0; x < notificationData.length; x++) {
            Notifications.cancelScheduledNotificationAsync(notificationData[x].notificationID);
        }
        const newList = state.notificationIDs.filter(obj => obj.itemID !== action.id);
        return { notificationIDs: newList };
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export default storage;
