import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS
} from './types';

export const addNotificationID = (item, reminderType, notificationID) => {
  return {
    type: ADD_NOTIFICATION_ID,
    notificationID,
    item,
    reminderType
  };
};

export const cancelNotification = (item, reminderType) => {
  return {
    type: CANCEL_NOTIFICATION,
    id: item.id,
    reminderType
  };
};

export const cancelAllNotifications = (item) => {
  return {
    type: CANCEL_ALL_NOTIFICATIONS,
    id: item.id
  };
};
