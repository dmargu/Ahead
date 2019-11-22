import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
  RESCHEDULE_NOTIFICATIONS
} from './types';
import cancelSingleNotification from '../functions/CancelNotification';

export const addNotificationID = (item, reminderType, notificationID) => {
  return {
    type: ADD_NOTIFICATION_ID,
    notificationID,
    item,
    reminderType
  };
};

export const testing = (number) => {
  return {
    type: 'testing',
    number
  };
};

/*export const cancelNotification = (item, reminderType) => {
  return (dispatch) => {
    //cancelSingleNotification(item, reminderType);
    dispatch({
      type: CANCEL_NOTIFICATION,
      item,
      reminderType,
      //newList
    });
  };
};*/

export const cancelNotification = () => {
  return {
    type: CANCEL_NOTIFICATION
  };
};

export const cancelAllNotifications = (item) => {
  return {
    type: CANCEL_ALL_NOTIFICATIONS,
    id: item.id,
  };
};

export const rescheduleNotifications = (item) => {
  return {
    type: RESCHEDULE_NOTIFICATIONS,
    item
  };
};
