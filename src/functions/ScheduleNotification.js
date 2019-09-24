import { Notifications } from 'expo';
import moment from 'moment';
import { registerForPushNotificationsAsync } from './pushNotificationsRegister';
//get the booleans of the reminders and if false register the notification and if true cancel it

export const scheduleNotification = {
  async startReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Reminder:',
          body: `${item.text} now`
        },
        {
          time: item.date
        }
      );
        //add notificationID to some piece of state (like an array)
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async tenMinReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Reminder:',
          body: `${item.text} in 10 minutes`
        },
        {
          time: moment(item.date).subtract(10, 'minutes').toDate()
        }
      );
      //add notificationID to some piece of state (like an array)
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async thirtyMinReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Reminder:',
          body: `${item.text} in thirty minutes`
        },
        {
          time: moment(item.date).subtract(30, 'minutes').toDate()
        }
      );
      //add notificationID to some piece of state (like an array)
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async oneHourReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Reminder:',
          body: `${item.text} in one hour`
        },
        {
          time: moment(item.date).subtract(1, 'hour').toDate()
        }
      );
      //add notificationID to some piece of state (like an array)
    } else {
      console.log('cannot send notification without permission.');
      }
  },
  async oneDayReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission) {
      const notificationID = Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Reminder:',
          body: `${item.text} in one day`
        },
        {
          time: moment(item.date).subtract(1, 'days').toDate()
        }
      );
    //add notificationID to some piece of state (like an array)
    } else {
      console.log('cannot send notification without permission.');
    }
  }
};
