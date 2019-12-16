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

export const cancelNotification = (id, reminderType) => {
  return {
    type: CANCEL_NOTIFICATION,
    id,
    reminderType,
  };
};

export const cancelAllNotifications = (id) => {
  return {
    type: CANCEL_ALL_NOTIFICATIONS,
    id,
  };
};
