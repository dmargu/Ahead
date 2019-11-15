import { Notifications } from 'expo';
import moment from 'moment';
import { registerForPushNotificationsAsync } from './pushNotificationsRegister';
import storeConfiguration from '../store';
import { addNotifiactionID } from '../actions/StorageActions';

const { store } = storeConfiguration();

export const scheduleNotification = {
  async startReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
        const notificationID = await Notifications.scheduleLocalNotificationAsync(
          (item.notes ?
            {
              title: 'Reminder:',
              body: `${item.text} now\nNotes: ${item.notes}`
            }
            :
            {
              title: 'Reminder:',
              body: `${item.text} now`
            }
          ),
          {
            time: item.date
          }
        );
        store.dispatch(addNotifiactionID(item, 'start', notificationID));
    } else {
      console.log('cannot send notification without permission and an item date.');
    }
  },
  async tenMinReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in ten minutes\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in ten minutes`
          }
        ),
        {
          time: moment(item.date).subtract(10, 'minutes').toDate()
        }
      );
      store.dispatch(addNotifiactionID(item, 'tenMin', notificationID));
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async thirtyMinReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in thirty minutes\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in thirty minutes`
          }
        ),
        {
          time: moment(item.date).subtract(30, 'minutes').toDate()
        }
      );
      store.dispatch(addNotifiactionID(item, 'thirtyMin', notificationID));
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async oneHourReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in one hour\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in one hour`
          }
        ),
        {
          time: moment(item.date).subtract(1, 'hour').toDate()
        }
      );
      store.dispatch(addNotifiactionID(item, 'oneHour', notificationID));
    } else {
      console.log('cannot send notification without permission.');
      }
  },
  async oneDayReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = await Notifications.scheduleLocalNotificationAsync(
        (item.notes ?
          {
            title: 'Reminder:',
            body: `${item.text} in one day\nNotes: ${item.notes}`
          }
          :
          {
            title: 'Reminder:',
            body: `${item.text} in one day`
          }
        ),
        {
          time: moment(item.date).subtract(1, 'days').toDate()
        }
      );
      store.dispatch(addNotifiactionID(item, 'oneDay', notificationID));
    } else {
      console.log('cannot send notification without permission.');
    }
  }
};
