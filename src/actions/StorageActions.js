import { ADD_NOTIFICATION_ID } from './types';

export const addNotifiactionID = (item, reminderType, notificationID) => {
  return { //I know this could fit in reminder actions but leads to warning due to importing function
    type: ADD_NOTIFICATION_ID, //from file that would also be importing a function
    notificationID,
    item,
    reminderType
  };
};
