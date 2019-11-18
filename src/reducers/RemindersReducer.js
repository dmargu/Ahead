import { Notifications } from 'expo';
import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION
} from '../actions/types';

const initialState = {
  notificationIDs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ID:
      return {
        ...state,
        notificationIDs: [...state.notificationIDs,
          {
            itemID: action.item.id,
            reminderType: action.reminderType,
            notificationID: action.notificationID
          }]
      };
    case CANCEL_NOTIFICATION: { //works perfectly if different session, same session doesn't work
      const notificationData = state.notificationIDs.find(
        obj => (obj.itemID === action.id && obj.reminderType === action.reminderType)
      ); //notification data will turn up undefined even though it is in the redux store. makes no sense.
      console.log(notificationData);
      Notifications.cancelScheduledNotificationAsync(notificationData.notificationID);

      const newList = state.notificationIDs.filter(obj => obj !== notificationData);
      return { ...state, notificationIDs: newList };
    }
    default:
      return state;
  }
};
