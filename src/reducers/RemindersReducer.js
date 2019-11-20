import { Notifications } from 'expo';
import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
  RESCHEDULE_NOTIFICATIONS
} from '../actions/types';
//import { scheduleNotification } from '../functions/ScheduleNotification';

const initialState = {
  notificationIDs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ID:
      return {
        notificationIDs: [...state.notificationIDs,
          {
            itemID: action.item.id,
            reminderType: action.reminderType,
            notificationID: action.notificationID
          }]
      };
    case CANCEL_NOTIFICATION: {
      console.log(state.notificationIDs);
      return { ...state };
    }
    case CANCEL_ALL_NOTIFICATIONS: {
      const notificationData = state.notificationIDs.filter(obj => (obj.itemID === action.id));
      console.log(notificationData);
      if (notificationData) {
        for (let x = 0; x < notificationData.length; x++) {
            Notifications.cancelScheduledNotificationAsync(notificationData[x].notificationID);
        }
        const newList = state.notificationIDs.filter(obj => obj.itemID !== action.id);
        return { notificationIDs: newList };
      }
      return { ...state };
    }
    /*case RESCHEDULE_NOTIFICATIONS: {
      const notificationData = state.notificationIDs.filter(obj => (obj.itemID === action.item.id));
      console.log(notificationData);
      if (notificationData) {
        for (let x = 0; x < notificationData.length; x++) {
            Notifications.cancelScheduledNotificationAsync(notificationData[x].notificationID);
        }
        if (action.item.startReminder) {
          scheduleNotification.startReminder(action.item);
        }
        const newList = state.notificationIDs.filter(obj => !obj.includes(notificationData));
        return { notificationIDs: newList };
      }
      return { ...state };
    }*/
    default:
      return state;
  }
};
