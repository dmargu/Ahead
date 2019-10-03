import { Notifications } from 'expo';
import moment from 'moment';
import { registerForPushNotificationsAsync } from './pushNotificationsRegister';
//get the booleans of the reminders and if false register the notification and if true cancel it
//in order to connect to redux you're probably gonna have to make this a class
//This function returns a notificationID, haven't figured out what to do with
 //it yet so instead of notificationID = Notifications.etcetc
 //it won't do anything with the ID, in future need some
 //redux array organized by item where each item contains each reminder and is either
 //blank or has the notificationID if there's a scheduled reminder, then pull it off
 //when user tries to cancel notification, right now the false check
 //means nothing because the onPress of the reminders won't work if it is true, but
 //in future giving user's option to cancel should be implemented
 //otherwise it should cancel it right here in an else statement
export const scheduleNotification = {
  async startReminder(item) {
    const permission = await registerForPushNotificationsAsync();
    if (permission) {
      if (item.startReminder === false) { //only send a reminder if there isn't one sent
        Notifications.scheduleLocalNotificationAsync(
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
      }
    } else {
      console.log('cannot send notification without permission and an item date.');
    }
  },
  async tenMinReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission && item.date) {
      if (item.tenMinReminder === false) {
        Notifications.scheduleLocalNotificationAsync(
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
      }
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async thirtyMinReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission && item.date) {
      if (item.thirtyMinReminder === false) {
        Notifications.scheduleLocalNotificationAsync(
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
      }
    } else {
      console.log('cannot send notification without permission.');
    }
  },
  async oneHourReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission && item.date) {
      if (item.oneHourReminder === false) {
        Notifications.scheduleLocalNotificationAsync(
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
      }
    } else {
      console.log('cannot send notification without permission.');
      }
  },
  async oneDayReminder(item) {
    const permission = registerForPushNotificationsAsync();
    if (permission && item.date) {
      if (item.oneDayReminder === false) {
        Notifications.scheduleLocalNotificationAsync(
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
      }
    } else {
      console.log('cannot send notification without permission.');
    }
  }
};
