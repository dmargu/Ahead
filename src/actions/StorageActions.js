import { Notifications } from 'expo';
import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
} from './types';

export const addNotificationID = (id, reminderType, notificationID) => {
  return {
    type: ADD_NOTIFICATION_ID,
    notificationID,
    id,
    reminderType
  };
};

export const cancelNotification = (id, reminderType, notificationIDs) => {
  return async (dispatch) => {
    const notificationData = notificationIDs.find(
      obj => (obj.itemID === id && obj.reminderType === reminderType)
    );
    await Notifications.cancelScheduledNotificationAsync(notificationData.notificationID);
    const newList = notificationIDs.filter(obj => obj !== notificationData);
    dispatch({
      type: CANCEL_NOTIFICATION,
      newList,
      reminderType,
      id
    });
  };
};

export const cancelAllNotifications = (id, notificationIDs) => {
  return async (dispatch) => {
    const notificationData = notificationIDs.filter(obj => (obj.itemID === id));
    if (notificationData) {
      for (let x = 0; x < notificationData.length; x++) {
          await Notifications.cancelScheduledNotificationAsync(notificationData[x].notificationID);
      }
      const newList = notificationIDs.filter(obj => obj.itemID !== id);
      dispatch({
        type: CANCEL_ALL_NOTIFICATIONS,
        newList,
        id
      });
    }
  };
};
