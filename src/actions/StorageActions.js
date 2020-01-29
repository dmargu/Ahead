import { Notifications } from 'expo';
import { getIcalEvents } from '../functions/GetIcalEvents';
import {
  ADD_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
  AFTER_CLASS_NOTIFICATION_RECEIVED,
  ADD_ICAL_EVENTS,
  CONNECT_TO_ICAL,
  STORE_SOURCE_ID
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

export const afterClassNotificationReceived = (className) => {
    return {
      type: AFTER_CLASS_NOTIFICATION_RECEIVED,
      payload: className
    };
};

export const addIcalEvents = () => { //when user first connects adds ical events and stores source id
  return async (dispatch) => {
    const { iCalEvents, sourceID, localiCalID } = await getIcalEvents();
    dispatch({
      type: ADD_ICAL_EVENTS,
      payload: iCalEvents
    });

    dispatch({
      type: STORE_SOURCE_ID,
      sourceID,
      localiCalID
    });
  };
};

export const rehydrateIcalEvents = () => { //don't want to keep changing source id so this only
  return async (dispatch) => { //adds the ical events back to the application state
    const { iCalEvents } = await getIcalEvents();

    dispatch({
      type: ADD_ICAL_EVENTS,
      payload: iCalEvents
    });
  };
};

export const connectToIcal = () => {
  return {
    type: CONNECT_TO_ICAL
  };
};
